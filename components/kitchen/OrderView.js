import React, { useEffect, useState } from 'react';

import 'moment/locale/th';
import moment from 'moment';

moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { firestore } from '../../firebase';

// Components
import OrderList from './OrderList';

const OrderView = ({ branch }) => {
  const theme = useTheme();
  const matches600down = useMediaQuery('(max-width:600px)');
  const [state, setState] = useState([]);

  useEffect(() => {
    firestore
      .collection(`branchId=${branch.id}`)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            firestore
              .collection(`branchId=${branch.id}`)
              .orderBy('createdAt', 'desc')
              .get()
              .then(async (snapshot) => {
                let data = [];
                if (!snapshot.empty) {
                  snapshot.forEach((doc) => {
                    data = [...data, { key: doc.id, ...doc.data() }];
                  });
                }
                setState(data);
              });
          }
          if (change.type === 'modified') {
            firestore
              .collection(`branchId=${branch.id}`)
              .orderBy('createdAt', 'desc')
              .get()
              .then(async (snapshot) => {
                let data = [];
                if (!snapshot.empty) {
                  snapshot.forEach((doc) => {
                    data = [...data, { key: doc.id, ...doc.data() }];
                  });
                }
                setState(data);
              });
          }
          if (change.type === 'removed') {
            firestore
              .collection(`branchId=${branch.id}`)
              .orderBy('createdAt', 'desc')
              .get()
              .then(async (snapshot) => {
                let data = [];
                if (!snapshot.empty) {
                  snapshot.forEach((doc) => {
                    data = [...data, { key: doc.id, ...doc.data() }];
                  });
                }
                setState(data);
              });
          }
        });
      });
  }, []);

  let orderCard = state.map((order) => {
    return <OrderList key={order.key} order={order} branchId={branch.id} />;
  });
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: theme.layer.maxwidth,
        width: '100%',
        margin: 'auto',
      }}
    >
      {orderCard}
    </div>
  );
};

export default OrderView;
