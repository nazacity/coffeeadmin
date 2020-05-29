import React, { useState, useEffect } from 'react';

// MUI
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Redux
import { useSelector } from 'react-redux';

const Detail = () => {
  const theme = useTheme();
  const orders = useSelector((state) => state.orders);
  const startDate = useSelector((state) => state.reportDate.startDate);
  const endDate = useSelector((state) => state.reportDate.startDate);

  const [state, setState] = useState([]);
  useEffect(() => {
    let filterOrders = orders.filter((order) => order.createdAt >= startDate);
    setState(filterOrders);
  }, [orders]);

  const calculateAmount = (orders) => {
    const amount = orders.reduce((sum, order) => sum + order.amount, 0);
    return amount / 100;
  };

  const calculateDiscount = (orders) => {
    const discount = orders.reduce((sum, order) => sum + order.discount, 0);
    return discount / 100;
  };

  const calculateNet = (orders) => {
    const net = orders.reduce((sum, order) => sum + order.net, 0);
    return net / 100;
  };

  const calculateFeeAndFeeVat = (orders) => {
    const fee = orders.reduce(
      (sum, order) => sum + order.fee + order.fee_vat,
      0
    );
    return fee / 100;
  };

  return (
    <div
      style={{
        padding: '2vh',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr 0.2fr',
        }}
      >
        <div>
          <Typography>ยอดรวม</Typography>
          <Typography>ส่วนลด</Typography>
          <Typography>ค่า Fee Omise</Typography>
          <Typography>คงเหลือ</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginRight: '2vw',
          }}
        >
          <Typography>{calculateAmount(state).toFixed(2)}</Typography>
          <Typography>{calculateDiscount(state).toFixed(2)}</Typography>
          <Typography>{calculateFeeAndFeeVat(state).toFixed(2)}</Typography>
          <Typography>{calculateNet(state).toFixed(2)}</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Typography>บาท</Typography>
          <Typography>บาท</Typography>
          <Typography>บาท</Typography>
          <Typography>บาท</Typography>
        </div>
      </div>
      <Divider variant="middle" style={{ width: '80%', margin: '2vh auto' }} />
    </div>
  );
};

export default Detail;
