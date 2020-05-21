import React, { useState, useEffect, useRef } from 'react';

// firebase
import { storage } from '../../firebase';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import {
  MUTATION_DELETE_STOCK,
  MUTATION_CREATE_STOCK,
  MUTAION_DELETE_STOCKCATALOG,
  MUTATION_UPDATE_STOCK,
} from '../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteStockCatalogs } from '../../redux/actions/stockActions';
import { updateBranch } from '../../redux/actions/storeActions';

// Moment
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

// Next
import Head from 'next/head';
import { useRouter } from 'next/router';

// MUI
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LensIcon from '@material-ui/icons/Lens';
import NatureIcon from '@material-ui/icons/Nature';

// Toast
import { useToasts } from 'react-toast-notifications';
import CreateStockAdd from './CreateStockAdd';
import StockAddItem from './StockAdditem';

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

const StockTable = ({ stock, branchId, setRerender }) => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const theme = useTheme();
  const classes = useStyles();
  const stockCatalog = useSelector((state) => state.stock.stockCatalog);
  const [lookup, setLookup] = useState({});
  const [row, setRow] = useState({});
  const [pictureUploading, setPictureUploading] = useState(false);
  const { addToast } = useToasts();
  const router = useRouter();

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
      .ref(`stocks/${row.catalogName}/${Image.name}`)
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
        addToast('ไม่สามารถอัพโหลดรูปวัตถุดิบได้', {
          appearance: 'success',
          autoDismiss: true,
        });
      },
      () => {
        // complete function ...
        storage
          .ref(`stocks/${row.catalogName}`)
          .child(Image.name)
          .getDownloadURL()
          .then((url) => {
            updateStock({
              variables: {
                id: row.id,
                name: row.name,
                pictureUrl: url,
              },
            });
          })
          .then(() => {
            addToast('อัพโหลดรูปวัตถุดิบเรียบร้อย', {
              appearance: 'success',
              autoDismiss: true,
            });
            setRow({});
          });
      }
    );
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  useEffect(() => {
    let lookupmap = {};
    stockCatalog.map((catalog) => {
      lookupmap = { ...lookupmap, [catalog.id]: catalog.th };
    });
    setLookup(lookupmap);
  }, [stockCatalog]);

  const columnTitle = [
    { title: 'ประเภท', field: 'th', editable: 'never' },
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
                src="./images/product/no-product-picture.png"
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
    { title: 'รายการ/หน่วย', field: 'name' },
    { title: 'ประเภท', field: 'catalog', lookup, defaultGroupOrder: 0 },
    { title: 'ประเภท', field: 'catalog', lookup },
    { title: 'คงเหลือ', field: 'remain', editable: 'never' },
    { title: 'ต้นทุน', field: 'amount', editable: 'never' },
  ];

  // const catalogData = async (DATA) => {
  //   await stockCatalog.map((catalog) => {
  //     DATA.push({ id: catalog.id, th: catalog.th });
  //   });
  // };

  const stockData = async (DATA) => {
    await stock.map((product) => {
      let formPrductData = {
        id: product.id,
        name: product.name,
        pictureUrl: product.pictureUrl,
        catalog: product.catalog?.id,
        catalogName: product.catalog?.name,
        remain: product.remain,
        amount: product.amount,
        stockAdd: product.stockAdd,
        stockOut: product.stockOut,
      };
      DATA.push(formPrductData);
    });
  };

  const [state, setState] = useState([]);
  useEffect(() => {
    let DATA = [];
    // catalogData(DATA);
    stockData(DATA);
    setState(DATA);
  }, [stock, stockCatalog]);

  const action = useDispatch();
  const [deleteStockCatalog] = useMutation(MUTAION_DELETE_STOCKCATALOG, {
    onCompleted: (data) => {
      action(deleteStockCatalogs(data.deleteStockCatalog.id));
      setRerender(true);
      setRerender(false);
      addToast('ลบประเภทวัตถุดิบเรียบร้อย', {
        appearance: 'success',
        autoDismiss: true,
      });
      router.reload();
    },
  });

  const [createStock] = useMutation(MUTATION_CREATE_STOCK, {
    onCompleted: (data) => {
      action(updateBranch(data.createStock));
      setRerender(true);
      setRerender(false);
      addToast('เพิ่มวัตถุดิบเรียบร้อย', {
        appearance: 'success',
        autoDismiss: true,
      });
    },
  });

  const [deleteStock] = useMutation(MUTATION_DELETE_STOCK, {
    onCompleted: (data) => {
      action(updateBranch(data.deleteStock));
      setRerender(true);
      setRerender(false);
      addToast('ลบวัตถุดิบเรียบร้อย', {
        appearance: 'success',
        autoDismiss: true,
      });
    },
  });

  const [updateStock] = useMutation(MUTATION_UPDATE_STOCK, {
    onCompleted: async (data) => {
      await setPictureUploading(false);
      await action(updateBranch(data.updateStock));
      setRerender(true);
      setRerender(false);
    },
  });

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
        />
      </Head>
      <input
        type="file"
        ref={imageInput}
        hidden="hidden"
        onChange={(e, rowData) => handleImageChange(e, rowData)}
      />
      <MaterialTable
        title="รายการวัตถุดิบ"
        columns={columnTitle}
        data={state}
        options={{
          exportButton: true,
          pageSize: 10,
        }}
        detailPanel={[
          {
            icon: () => <LensIcon />,
            isFreeAction: true,
            openIcon: () => <NatureIcon />,
            tooltip: 'รายการเพิ่ม-ลดวัตถุดิบ',
            render: (rowData) => {
              if (rowData.th) return '';
              return (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                  }}
                >
                  {rowData.stockAdd.map((item) => (
                    <Card
                      key={item.id}
                      style={{ margin: '1vh', padding: '1vh' }}
                    >
                      <StockAddItem item={item} />
                    </Card>
                  ))}
                  {/* {rowData.stockOut?.map((item) => (
                    <Card
                      key={item.id}
                      style={{ margin: '1vh', padding: '1vh' }}
                    >
                      <StockAddItem item={item} />
                    </Card>
                  ))} */}
                </div>
              );
            },
          },
        ]}
        options={{
          grouping: true,
        }}
        // parentChildData={(row, rows) => rows.find((a) => a.id === row.catalog)}
        editable={{
          isEditable: (rowData) => rowData.pictureUrl,
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              if (!newData.name || !newData.catalog) {
                // TO DO popup message
                addToast('กรุณาใส่ข้อมูลให้ครบถ้วน', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                return resolve();
              }
              if (newData) {
                try {
                  await createStock({
                    variables: {
                      ...newData,
                      catalogId: newData.catalog,
                      branchId: branchId,
                      pictureUrl: './images/product/no-product-picture.png',
                    },
                  });

                  resolve();
                } catch (error) {
                  console.log(error);
                  addToast('ไม่สามารถเพิ่มวัตถุดิบได้', {
                    appearance: 'error',
                    autoDismiss: true,
                  });
                  resolve();
                }
              }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve) => {
              if (!newData.name || !newData.pictureUrl) {
                // TO DO popup message
                addToast('ไม่สามารถแก้ไขข้อมูลวัตถุดิบได้', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                return resolve();
              }
              if (newData.name !== oldData.name) {
                try {
                  updateStock({
                    variables: {
                      ...newData,
                    },
                  });
                  resolve();
                } catch (error) {
                  addToast('ไม่สามารถแก้ไขข้อมูลวัตถุดิบได้', {
                    appearance: 'error',
                    autoDismiss: true,
                  });
                  resolve();
                }
              } else {
                addToast('ไม่สามารถแก้ไขข้อมูลวัตถุดิบได้', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                resolve();
              }
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              if (!oldData) return;
              // Delete Catalog
              if (!oldData.pictureUrl) {
                try {
                  await deleteStockCatalog({
                    variables: {
                      id: oldData.id,
                    },
                  });
                } catch (error) {
                  addToast('ไม่สามารถลบประเภทวัตถุดิบได้', {
                    appearance: 'error',
                    autoDismiss: true,
                  });
                  resolve();
                }
              }
              if (oldData.pictureUrl) {
                try {
                  deleteStock({
                    variables: {
                      id: oldData.id,
                    },
                  });
                } catch (error) {
                  addToast('ไม่สามารถลบข้อมูลวัตถุดิบได้', {
                    appearance: 'error',
                    autoDismiss: true,
                  });
                  resolve();
                }
              }
              resolve();
            }),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'ยังสินค้า',
            editTooltip: 'แก้ไข',
            deleteTooltip: 'ลบ',
            addTooltip: 'เพิ่มสินค้า',
            editRow: {
              deleteText: 'คุณต้องการลบสินค้า หรือ ประเภทสินค้า ใช่หรือไม่',
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
          (rowData) => ({
            icon: 'add_shopping_cart',
            tooltip: 'เพิ่มวัตถุดิบ',
            onClick: (event, rowData) => {
              setRow(rowData);
              handleClickOpen();
            },
            hidden: !rowData.pictureUrl,
          }),
        ]}
        style={{
          boxShadow: matches1024down ? 'none' : theme.common.shadow.main1,
          marginBottom: '100px',
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth={true}
      >
        <Typography variant="h6" align="center">
          เพิ่มปริมาณวัตถุดิบ
        </Typography>
        <CreateStockAdd
          row={row}
          setRerender={setRerender}
          handleClose={handleClose}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default StockTable;
