import React, { useState, useEffect } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
// import {
//   MUTAION_DELETECATALOG,
//   MUTAION_CREATEPRODUCT,
//   MUTAION_DELETEPRODUCT,
//   MUTAION_UPDATERODUCT,
// } from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
// import {
//   deleteCatalogs,
//   createProducts,
//   deleteProducts,
//   updateProducts,
// } from '../../../redux/actions/productAction';

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
import Card from '@material-ui/core/Card';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 80,
    height: 80,
    boxShadow: theme.common.shadow.black,
  },
}));

const OrderTable = () => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const theme = useTheme();
  const classes = useStyles();

  const columnTitle = [
    {
      title: 'ยอดทั้งหมด',
      field: 'amount',
      render: (rowData) => (rowData.amount / 100).toFixed(2),
      editable: 'never',
    },
    {
      title: 'ส่วนลด',
      field: 'discount',
      render: (rowData) => (rowData.discount / 100).toFixed(2),
      editable: 'never',
    },
    {
      title: 'ยอดรับเงิน',
      field: 'net',
      render: (rowData) => (rowData.net / 100).toFixed(2),
      editable: 'never',
    },
    {
      title: 'วิธีการจ่าย',
      field: 'by',
      lookup: {
        omise: 'omise',
        cash: 'เงินสด',
      },
      editable: 'never',
    },
    {
      title: 'สถานะ',
      field: 'status',
      lookup: {
        paid: 'จ่ายเงินแล้ว',
        pending: 'ยังไม่จ่ายเงิน',
        failed: 'ล้มเหลว',
      },
    },
    {
      title: 'ลำดับ',
      field: 'step',
    },
  ];

  const action = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [state, setState] = useState([]);
  useEffect(() => {
    let newForm;
    newForm = orders.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    setState(newForm);
  }, [orders]);

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
      <MaterialTable
        title="รายการสินค้า"
        columns={columnTitle}
        data={state}
        options={{
          exportButton: true,
          pageSize: 5,
          draggable: false,
        }}
        editable={{
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
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'ยังไม่มีออเดอร์',
            editTooltip: 'แก้ไข',
            deleteTooltip: 'ลบ',
            addTooltip: 'เพิ่มออเดอร์',
            editRow: {
              deleteText: '',
              cancelTooltip: 'ยกเลิก',
              saveTooltip: 'ตกลง',
            },
          },
          toolbar: {
            searchTooltip: 'ค้นหาออเดอร์',
            searchPlaceholder: 'ค้นหาออเดอร์',
            exportName: 'ดาวโหลด รายงาน',
            nRowsSelected: 'เลือกออเดอร์ {0}',
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
        detailPanel={(rowData) => {
          return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  margin: '1vh',
                }}
              >
                <div>
                  <Avatar
                    src={rowData.user.pictureUrl}
                    alt={rowData.user.firstName}
                    className={classes.avatar}
                  />
                </div>
                <div>
                  <Typography variant="h6">{rowData.user.firstName}</Typography>
                  <Typography variant="h6">{rowData.user.phone}</Typography>
                </div>
                <div>
                  {rowData.place.branch === 'online' ? (
                    <Typography variant="h6">{rowData.place.branch}</Typography>
                  ) : (
                    <div>
                      <Typography variant="h6">
                        สาขา {rowData.place.branch}
                      </Typography>
                      <Typography variant="h6">
                        โต๊ะ {rowData.place.table}
                      </Typography>
                    </div>
                  )}
                </div>
              </Card>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr ',
                }}
              >
                {rowData.items.map((item) => (
                  <Card
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: '60px',
                      margin: '1vh',
                      padding: '1vh',
                    }}
                  >
                    <Avatar
                      src={item.product.pictureUrl}
                      alt={item.product.name}
                      style={{
                        boxShadow: theme.common.shadow.black,
                      }}
                    />
                    <Typography>{item.product.name}</Typography>
                    <Typography>{item.quantity}</Typography>
                  </Card>
                ))}
              </div>
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </React.Fragment>
  );
};

export default OrderTable;
