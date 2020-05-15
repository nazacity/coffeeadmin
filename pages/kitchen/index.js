import React, { useEffect, useState } from 'react';
import _ from 'lodash';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import { getData, QUERY_ORDERS, getUserByAccessToken } from '../../apollo/db';

import { db } from '../../firebase';

// MUI
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';

// framer motion
import { motion } from 'framer-motion';

import cookie from 'cookie';

const Kitchen = ({ orders, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
  }, [orders, user]);
  const [state, setState] = useState([]);

  setTimeout(() => {
    db.ref('/order').on('value', (snapshot) => {
      let convertForm;
      convertForm = Object.values(snapshot.val());
      let a = snapshot.val();
      let b;
      if (a !== b) {
        setState(convertForm);
        b = a;
      }
    });
  }, 5000);

  let orderCard = state.map((order) => {
    return (
      <Card
        key={order.id}
        style={{
          margin: '1vh',
          display: 'flex',
          alignItem: 'center',
        }}
      >
        <Avatar src={order.user.pictureUrl} alt={order.user.name} />
        <h1>{order.user.firstName}</h1>
        {order.items.map((item) => (
          <div key={item.id}>
            <Avatar src={item.product.pictureUrl} alt={item.name} />
          </div>
        ))}
      </Card>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {orderCard}
    </motion.div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  if (!accessToken) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return { props: {} };
  } else {
    const user = await getUserByAccessToken(accessToken);

    return { props: { user } };
  }
};

export default Kitchen;
