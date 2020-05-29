import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';

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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
      title: 'วันเวลา',
      field: 'createdAt',
      render: (rowData) => moment(rowData.createdAt).format('DD/MM/YY HH:mm'),
      filtering: false,
      editable: 'never',
    },
    {
      title: 'ราคาก่อนส่วนลด',
      field: 'amount',
      render: (rowData) => (rowData.amount / 100).toFixed(2),
      editable: 'never',
      filtering: false,
    },
    {
      title: 'ส่วนลด',
      field: 'discount',
      render: (rowData) => (rowData.discount / 100).toFixed(2),
      editable: 'never',
      filtering: false,
    },
    {
      title: 'ยอดสุทธิ',
      field: 'net',
      render: (rowData) => (rowData.net / 100).toFixed(2),
      editable: 'never',
      filtering: false,
    },
    {
      title: 'วิธีการจ่าย',
      field: 'by',
      lookup: {
        omise: 'omise',
        cash: 'เงินสด',
        creditcard: 'บัตรเครดิต',
        store: 'ยังไม่ได้เคลียร์โต๊ะ',
      },
      editable: 'never',
    },
    {
      title: 'สถานะ',
      field: 'status',
      editable: 'never',
      lookup: {
        pending: 'กำลังชำระ',
        successful: 'สำเร็จ',
      },
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
          pageSize: 10,
          draggable: false,
          filtering: true,
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
        style={{
          boxShadow: matches1024down ? 'none' : theme.common.shadow.black,
          marginBottom: '100px',
        }}
        detailPanel={(rowData) => {
          return (
            <div style={{ padding: '2vh' }}>
              {rowData.user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={rowData.user.pictureUrl}
                    alt={rowData.user.firstName}
                    style={{ marginRight: '2vh' }}
                  />
                  <Typography style={{ marginRight: '2vh' }}>
                    คุณ {rowData.user.firstName}
                  </Typography>
                  <Typography style={{ marginRight: '2vh' }}>
                    คุณ {rowData.user.phone}
                  </Typography>
                  <div>
                    <Typography align="center">พิกัด</Typography>

                    <Typography>lat: {rowData.position.lat}</Typography>
                    <Typography>lng: {rowData.position.lng}</Typography>
                  </div>
                </div>
              )}
              {rowData.place && (
                <div>
                  สาขา {rowData.branch.branch} โต๊ะ {rowData.place.table}
                </div>
              )}
              <Divider style={{ width: '80%', margin: '2vh auto' }} />
              {rowData.items.map((item, index) => {
                let itemData;
                if (item.storeProduct) itemData = item.storeProduct;
                if (item.onlineProduct) itemData = item.onlineProduct;

                return (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr 1fr 1fr',
                      width: '100%',
                      color: theme.palette.secondary.main,
                    }}
                    key={`${itemData.id}${index}`}
                  >
                    <Avatar
                      src={itemData.pictureUrl}
                      alt={itemData.name}
                      style={{ margin: 'auto' }}
                    />

                    <p style={{ margin: 'auto' }}>{itemData.name}</p>
                    <p style={{ margin: 'auto' }}>{item.quantity}</p>
                    <p style={{ margin: 'auto' }}>
                      {itemData.price * item.quantity}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </React.Fragment>
  );
};

export default OrderTable;
