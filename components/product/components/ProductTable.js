import React, { useState, useEffect, useRef } from 'react';

// firebase
import { storage } from '../../../firebase';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import {
  MUTAION_DELETECATALOG,
  MUTAION_CREATEPRODUCT,
  MUTAION_DELETEPRODUCT,
  MUTAION_UPDATERODUCT,
} from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteCatalogs,
  createProducts,
  deleteProducts,
  updateProducts,
} from '../../../redux/actions/productAction';

// Moment
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

// Next
import Head from 'next/head';

// MUI
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const ProductTable = () => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const theme = useTheme();
  const classes = useStyles();
  const catalogs = useSelector((state) => state.products.catalogs);
  const [lookup, setLookup] = useState({});
  const [row, setRow] = useState({});
  const [pictureUploading, setPictureUploading] = useState(false);

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
      .ref(`products/${row.catalog}/${Image.name}`)
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
          .ref(`products/${row.catalog}`)
          .child(Image.name)
          .getDownloadURL()
          .then((url) => {
            updateProduct({
              variables: {
                id: row.id,
                pictureUrl: url,
              },
            });
          })
          .then(() => {
            setRow({});
          });
      }
    );
  };

  useEffect(() => {
    let lookupmap = {};
    catalogs.map((catalog) => {
      lookupmap = { ...lookupmap, [catalog.name]: catalog.th };
    });
    setLookup(lookupmap);
  }, [catalogs]);
  const columnTitle = [
    { title: 'ประเภท', field: 'th', editable: 'never' },
    {
      title: 'รูปภาพ',
      field: 'pictureUrl',
      render: (rowData) => {
        if (rowData.pictureUrl) {
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
        }
      },

      editable: 'never',
    },
    { title: 'รายการ', field: 'name' },
    { title: 'รายละเอียด', field: 'description' },
    {
      title: 'ราคา',
      field: 'price',
    },
    { title: 'ประเภท', field: 'catalog', lookup },
  ];
  const products = useSelector((state) => state.products.products);

  const catalogData = async (DATA) => {
    await catalogs.map((catalog) => {
      DATA.push(catalog);
    });
  };
  const productData = async (DATA) => {
    await products.map((product) => {
      let formPrductData = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        pictureUrl: product.pictureUrl,
        catalog: product.catalog,
      };
      DATA.push(formPrductData);
    });
  };
  const [state, setState] = useState([]);
  useEffect(() => {
    let DATA = [];
    catalogData(DATA);
    productData(DATA);
    setState(DATA);
  }, [products, catalogs]);

  const action = useDispatch();
  const [deleteCatalog] = useMutation(MUTAION_DELETECATALOG, {
    onCompleted: (data) => {
      action(deleteCatalogs(data.deleteCatalog.id));
    },
  });

  const [createProduct] = useMutation(MUTAION_CREATEPRODUCT, {
    onCompleted: (data) => {
      action(createProducts(data.createProduct));
    },
  });

  const [deleteProduct] = useMutation(MUTAION_DELETEPRODUCT, {
    onCompleted: (data) => {
      action(deleteProducts(data.deleteProduct.id));
    },
  });

  const [updateProduct] = useMutation(MUTAION_UPDATERODUCT, {
    onCompleted: async (data) => {
      await setPictureUploading(false);
      await action(updateProducts(data.updateProduct));
      let DATA = [];
      catalogData(DATA);
      productData(DATA);
      setState(DATA);
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
        title="รายการสินค้า"
        columns={columnTitle}
        data={state}
        options={{
          exportButton: true,
          pageSize: 5,
        }}
        parentChildData={(row, rows) =>
          rows.find((a) => a.name === row.catalog)
        }
        editable={{
          isEditable: (rowData) => rowData.pictureUrl,
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              if (
                !newData.name ||
                !newData.description ||
                !newData.price ||
                !newData.catalog
              ) {
                // TO DO popup message
                console.log('กรุณาใส่ข้อมูลให้ครบถ้วน');
                return resolve();
              }
              if (newData) {
                createProduct({
                  variables: {
                    ...newData,
                    pictureUrl: './images/product/no-product-picture.png',
                    price: +newData.price,
                  },
                });
                resolve();
              }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              if (
                !newData.name ||
                !newData.description ||
                !newData.price ||
                !newData.catalog
              ) {
                // TO DO popup message
                console.log('กรุณาใส่ข้อมูลให้ครบถ้วน');
                return resolve();
              }
              if (newData) {
                updateProduct({
                  variables: {
                    ...newData,
                    price: +newData.price,
                  },
                });
                resolve();
              }
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              if (!oldData) return;
              // Delete Catalog
              if (!oldData.pictureUrl) {
                deleteCatalog({
                  variables: {
                    id: oldData.id,
                  },
                });
              }
              if (oldData.pictureUrl) {
                deleteProduct({
                  variables: {
                    id: oldData.id,
                  },
                });
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
        ]}
        style={{
          boxShadow: matches1024down ? 'none' : theme.common.shadow.black,
          marginBottom: '100px',
        }}
      />
    </React.Fragment>
  );
};

export default ProductTable;
