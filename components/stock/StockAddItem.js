import React from 'react';

import Typography from '@material-ui/core/Typography';

import moment from 'moment';

const StockAddItem = ({ item }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography align="center">ปริมาณ</Typography>
        <Typography align="center">{item.buy}</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography align="center">ราคา</Typography>
        <Typography align="center">{item.amount} บาท</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography align="center">
          {moment(+item.createdAt).format('DD/MM/YY')}
        </Typography>
        <Typography align="center">
          {moment(+item.createdAt).format('HH:mm')}
        </Typography>
      </div>
    </div>
  );
};

export default StockAddItem;
