import React, { useState, useEffect, useRef } from 'react';

// firebase
import { storage } from '../../../firebase';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import {
  MUTAION_UPDATE_STOREPRODUCT,
  MUTAION_DELETE_STOREPRODUCT,
} from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  updateStoreProducts,
  deleteStoreProducts,
} from '../../../redux/actions/productAction';

// Moment
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Toast
import { useToasts } from 'react-toast-notifications';
import CreateStoreProduct from './CreateStoreProduct';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
    left: 7,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 7,
  },
}));

const StoreProductTable = ({ setRerender }) => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const theme = useTheme();
  const classes = useStyles();
  const catalogs = useSelector((state) => state.products.storeProductCatalogs);
  const [lookup, setLookup] = useState({});
  const [row, setRow] = useState({});
  const [pictureUploading, setPictureUploading] = useState(false);
  const [addStoreProductDialog, setAddStoreProductDialog] = useState(false);
  const { addToast } = useToasts();

  const handleAddStoreProductDialogClose = () => {
    setAddStoreProductDialog(false);
  };

  const imageInput = useRef();
  const handleEditPicture = () => {
    imageInput.current.click();
  };
  const handleImageChange = (e) => {
    setPictureUploading(true);
    const Image = e.target.files[0];
    if (!e.target.value.length) {
      setRow({});
    }
    const uploadTask = storage
      .ref(`products/${row.catalogName}/${Image.name}`)
      .put(Image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        // error function ....
        console.log(err);
      },
      () => {
        // complete function ...
        storage
          .ref(`products/${row.catalogName}`)
          .child(Image.name)
          .getDownloadURL()
          .then((url) => {
            updateStoreProduct({
              variables: {
                id: row.id,
                pictureUrl: url,
              },
            });
          });
      }
    );
  };

  useEffect(() => {
    let lookupmap = {};
    catalogs.map((catalog) => {
      lookupmap = { ...lookupmap, [catalog.id]: catalog.th };
    });
    setLookup(lookupmap);
  }, [catalogs]);

  const columnTitle = [
    {
      title: 'รูปภาพ',
      field: 'pictureUrl',
      render: (rowData) => {
        if (rowData?.pictureUrl) {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={rowData?.pictureUrl ? rowData.pictureUrl : ''}
                style={{
                  width: 40,
                  borderRadius: '50%',
                  opacity:
                    rowData.id === row.id && pictureUploading === true && 0.5,
                }}
              />
              {rowData.id === row.id && pictureUploading === true && (
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    className={classes.top}
                    size={24}
                    thickness={4}
                  />
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    className={classes.bottom}
                    size={24}
                    thickness={4}
                  />
                </div>
              )}
            </div>
          );
        } else {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/coffeecafesho.appspot.com/o/products%2Fno-product-picture.png?alt=media"
                style={{
                  width: 40,
                  borderRadius: '50%',
                }}
              />
            </div>
          );
        }
      },

      editable: 'never',
    },
    { title: 'รายการ', field: 'name' },
    {
      title: 'ราคา',
      field: 'price',
    },
    {
      title: 'คอร์ส',
      field: 'package',
    },
    { title: 'ประเภท', field: 'catalog', lookup },
    { title: 'ประเภท', field: 'catalog', lookup, defaultGroupOrder: 0 },
  ];
  const products = useSelector((state) => state.products.storeProducts);

  const productData = async (DATA) => {
    await products.map((product) => {
      let formPrductData = {
        id: product.id,
        name: product.name,
        pictureUrl: product.pictureUrl,
        price: product.price,
        catalog: product.catalog?.id,
        catalogName: product.catalog?.name,
        stockOutDetail: product.stockOutDetail,
        package: product.package,
      };
      DATA.push(formPrductData);
    });
  };

  const [state, setState] = useState([]);
  useEffect(() => {
    let DATA = [];
    productData(DATA);
    setState(DATA);
  }, [products]);

  const action = useDispatch();

  const [deleteStoreProduct] = useMutation(MUTAION_DELETE_STOREPRODUCT, {
    onCompleted: (data) => {
      action(deleteStoreProducts(data.deleteStoreProduct.id));

      setRerender(true);
      setRerender(false);

      const content = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={data.deleteStoreProduct.pictureUrl}
            alt={data.deleteStoreProduct.name}
            style={{
              marginRight: '1vh',
              backgroundColor: '#fff',
              boxShadow: theme.common.shadow.black,
            }}
          />
          <Typography>
            ลบสินค้า {data.deleteStoreProduct.name} ในร้านเรียบร้อย
          </Typography>
        </div>
      );
      addToast(content, {
        appearance: 'warning',
        autoDismiss: true,
      });
    },
  });

  const [updateStoreProduct] = useMutation(MUTAION_UPDATE_STOREPRODUCT, {
    onCompleted: (data) => {
      setPictureUploading(false);
      action(updateStoreProducts(data.updateStoreProduct));
      setRow({});
      let DATA = [];
      productData(DATA);
      setState(DATA);

      const content = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={data.updateStoreProduct.pictureUrl}
            alt={data.updateStoreProduct.name}
            style={{
              marginRight: '1vh',
              backgroundColor: '#fff',
              boxShadow: theme.common.shadow.black,
            }}
          />
          <Typography>
            แก้ไขสินค้า {data.updateStoreProduct.name} ในร้านเรียบร้อย
          </Typography>
        </div>
      );
      addToast(content, {
        appearance: 'success',
        autoDismiss: true,
      });
    },
  });

  return (
    <React.Fragment>
      <input
        type="file"
        ref={imageInput}
        hidden="hidden"
        onChange={(e, rowData) => handleImageChange(e, rowData)}
      />
      <MaterialTable
        title="รายการสินค้า"
        columns={columnTitle}
        data={state}
        options={{
          exportButton: true,
          pageSize: 5,
          grouping: true,
          draggable: false,
        }}
        editable={{
          isEditable: (rowData) => rowData.pictureUrl,
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve) => {
              if (!newData.name || !newData.price || !newData.catalog) {
                addToast('กรุณาเติมข้อมูลให้ครบถ้วน', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                return resolve();
              }

              if (
                newData.name !== oldData.name ||
                newData.price !== oldData.price ||
                newData.catalog !== oldData.catalog
              ) {
                try {
                  updateStoreProduct({
                    variables: {
                      id: newData.id,
                      name: newData.name,
                      price: +newData.price,
                      catalogId: newData.catalog,
                      pictureUrl: oldData.pictureUrl,
                    },
                  });
                  resolve();
                } catch (error) {
                  addToast('ไม่สามารถแก้ไขสินค้าได้', {
                    appearance: 'error',
                    autoDismiss: true,
                  });
                  resolve();
                }
              } else {
                addToast('ไม่มีการเปลี่ยนแปลงข้อมูล', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                resolve();
              }
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                deleteStoreProduct({
                  variables: {
                    id: oldData.id,
                  },
                });
                resolve();
              } catch (error) {
                addToast('ไม่มีสามารถลบสินค้าได้', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                resolve();
              }
            }),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'ยังไม่มีสินค้า',
            editTooltip: 'แก้ไข',
            deleteTooltip: 'ลบ',
            addTooltip: 'เพิ่มสินค้า',
            editRow: {
              deleteText: 'คุณต้องการลบสินค้า ใช่ หรือ ไม่',
              cancelTooltip: 'ยกเลิก',
              saveTooltip: 'ตกลง',
            },
          },
          toolbar: {
            searchTooltip: 'ค้นหาสินค้า',
            searchPlaceholder: 'ค้นหาสินค้า',
            exportName: 'ดาวโหลด รายงาน',
            nRowsSelected: 'เลือกสินค้า {0}',
          },
          pagination: {
            labelRowsSelect: 'แถว',
            labelDisplayedRows: ' {from}-{to} จาก {count}',
            firstTooltip: 'หน้าแรก',
            previousTooltip: 'หน้าก่อน',
            nextTooltip: 'หน้าต่อไป',
            lastTooltip: 'หน้าสุดท้าย',
          },
          header: {
            actions: '',
          },
        }}
        actions={[
          (rowData) => ({
            icon: 'photo',
            tooltip: 'อัพโหลดรูปภาพ',
            onClick: (event, rowData) => {
              setRow(rowData);
              handleEditPicture();
            },
            hidden: !rowData.pictureUrl,
          }),
          {
            icon: 'add_box',
            tooltip: 'เพิ่มสินค้า',
            isFreeAction: true,
            onClick: (event, rowData) => {
              setAddStoreProductDialog(true);
            },
          },
        ]}
        style={{
          margin: '0 auto 150px auto',
        }}
      />
      <Dialog
        onClose={handleAddStoreProductDialogClose}
        open={addStoreProductDialog}
        fullWidth
        maxWidth="md"
      >
        <CreateStoreProduct
          handleAddStoreProductDialogClose={handleAddStoreProductDialogClose}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default StoreProductTable;
