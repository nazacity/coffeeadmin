import React, { useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setOrder } from '../../redux/actions/orderActions';

// Apollo
import { getData, getUserByAccessToken } from '../../apollo/db';

// Components
import OrderTable from '../../components/order/OrderTable';

// framer motion
import { motion } from 'framer-motion';

import cookie from 'cookie';

const Order = ({ orders, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
    action(setOrder(orders ? orders : null));
  }, [orders, user]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <OrderTable />
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
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return { props: { orders: [], user } };
  }
};

export default Order;
