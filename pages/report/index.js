import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setOrder } from '../../redux/actions/orderActions';

// Apollo
import { getData, QUERY_ORDERS, getUserByAccessToken } from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';

// Components
import Report from '../../components/report/Report';

import cookie from 'cookie';

const OrderList = ({ user, orders }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
    action(setOrder(orders ? orders : null));
  }, [user, orders]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Report />
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
    const result = await getData(QUERY_ORDERS);
    const { orders } = result.data;
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return { props: { user, orders } };
  }
};

export default OrderList;
