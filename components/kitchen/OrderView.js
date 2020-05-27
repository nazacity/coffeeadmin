import React, { useEffect, useState } from 'react';

import 'moment/locale/th';
import moment from 'moment';

moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { db } from '../../firebase';

// Components
import OrderList from './OrderList';

const OrderView = ({ branch }) => {
  const theme = useTheme();
  const matches600down = useMediaQuery('(max-width:600px)');
  const [state, setState] = useState([]);

  const convert = async (values) => {
    let orders = Object.entries(values);
    let returnForm = [];
    await orders.map((order) => {
      returnForm.push({ key: order[0], ...order[1] });
    });

    return returnForm;
  };

  setTimeout(() => {
    db.ref(`/${branch.id}`).on('value', async (snapshot) => {
      let convertForm = [];
      if (snapshot.val()) {
        convertForm = await convert(snapshot.val());
      }

      let rearrange = convertForm.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      let a = snapshot.val();
      let b;
      if (a !== b) {
        setState(rearrange);
        b = a;
      }
    });
  }, 5000);

  let orderCard = state.map((order) => {
    return <OrderList key={order.key} order={order} />;
  });
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: theme.layer.maxwidth,
        width: matches600down ? '100%' : '80%',
        margin: 'auto',
      }}
    >
      {orderCard}
    </div>
  );
};

export default OrderView;
