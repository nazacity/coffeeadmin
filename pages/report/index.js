import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setOrder } from '../../redux/actions/orderActions';
import { setBranch } from '../../redux/actions/storeActions';
import {
  setOnlineProductCatalogs,
  setStoreProductCatalogs,
} from '../../redux/actions/productAction';

// Apollo
import {
  getData,
  QUERY_ORDERS,
  getUserByAccessToken,
  QUERY_BRANCHID,
  QUERY_ONLINEPRODUCTCATALOG,
  QUERY_STOREPRODUCTCATALOG,
} from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';

// Components
import Report from '../../components/report/Report';

import cookie from 'cookie';

const OrderList = ({
  user,
  orders,
  branch,
  onlineProductCatalogs,
  storeProductCatalogs,
}) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
    action(setOrder(orders ? orders : null));
    action(setBranch(branch ? branch : null));
    action(setOnlineProductCatalogs(onlineProductCatalogs));
    action(setStoreProductCatalogs(storeProductCatalogs));
  }, [user, orders, branch]);

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
  let resultOnlineProductCatalogs = await getData(QUERY_ONLINEPRODUCTCATALOG);
  let onlineProductCatalogs =
    resultOnlineProductCatalogs.data.onlineProductCatalog;
  let resultStoreProductCatalogs = await getData(QUERY_STOREPRODUCTCATALOG);

  let storeProductCatalogs =
    resultStoreProductCatalogs.data.storeProductCatalog;

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
    const result2 = await getData(QUERY_BRANCHID);
    const { orders } = result.data;
    const { branch } = result2.data;
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return {
      props: {
        user,
        orders,
        branch,
        onlineProductCatalogs,
        storeProductCatalogs,
      },
    };
  }
};

export default OrderList;
