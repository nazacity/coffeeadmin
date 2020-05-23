import React from 'react';

// MUI
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteStoreProductCatalogs } from '../../../redux/actions/productAction';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTAION_DELETE_STOREPRODUCTCATALOG } from '../../../apollo/mutation';

// Toast
import { useToasts } from 'react-toast-notifications';

const DeleteStoreCatalog = ({ setRerender }) => {
  const catalogs = useSelector((state) => state.products.storeProductCatalogs);
  const matches600down = useMediaQuery('(max-width:600px)');
  const action = useDispatch();
  const theme = useTheme();
  const { addToast } = useToasts();
  const [deleteStoreProductCatalog, { loading, error }] = useMutation(
    MUTAION_DELETE_STOREPRODUCTCATALOG,
    {
      onCompleted: (data) => {
        action(deleteStoreProductCatalogs(data.deleteStoreProductCatalog.id));
        setRerender(true);
        setRerender(false);
        addToast('ลบประเภทวัตถุดิบเรียบร้อย', {
          appearance: 'warning',
          autoDismiss: true,
        });
        handleClose();
      },
    }
  );

  const [open, setOpen] = React.useState(false);
  const [catalogId, setCatalogId] = React.useState(false);

  const handleClickOpen = (id) => {
    setCatalogId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCatalogId('');
  };
  return (
    <div
      style={{
        display: matches600down ? 'grid' : undefined,
        gridTemplateColumns: '1fr 1fr',
        margin: 'auto 1vh',
      }}
    >
      {catalogs.map((catalog) => (
        <Card
          key={catalog.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1vh',
            boxShadow: theme.common.shadow.main1,
          }}
        >
          <Typography color="primary" style={{ margin: '0 1vh' }} variant="h6">
            {catalog.th}
          </Typography>
          <IconButton
            variant="contained"
            style={{ color: '#d32f2f' }}
            onClick={() => handleClickOpen(catalog.id)}
          >
            <HighlightOffIcon />
          </IconButton>
        </Card>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={matches600down ? 'md' : undefined}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Typography align="center">ต้องการลบประเภทสินค้าในร้าน</Typography>
          <Typography align="center">ใช่ หรือ ไม่</Typography>
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              deleteStoreProductCatalog({
                variables: {
                  id: catalogId,
                },
              });
            }}
            color="primary"
          >
            ตกลง
          </Button>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteStoreCatalog;
