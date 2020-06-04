import React, { useEffect, useState } from 'react';
import { getUserByAccessToken } from '../../apollo/db';
// Redux
import { useDispatch } from 'react-redux';
import {
  setOnlineProducts,
  setOnlineProductCatalogs,
} from '../../redux/actions/productAction';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import {
  getData,
  QUERY_ONLINEPRODUCTCATALOG,
  QUERY_ONLINEPRODUCT,
} from '../../apollo/db';

// MUI
import { useTheme } from '@material-ui/core/styles';

// framer motion
import { motion } from 'framer-motion';

import cookie from 'cookie';

// Components
import CreateOnlineProductCatalog from '../../components/product/online/CreateOnlineProductCatalog';
import OnlineProductTable from '../../components/product/online/OnlineProductTable';

const OnlineProduct = ({ onlineProductCatalogs, onlineProduct, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setOnlineProductCatalogs(onlineProductCatalogs));
    action(setOnlineProducts(onlineProduct));
    action(setUser(user ? user : null));
  }, [onlineProductCatalogs, user]);
  const [rerendet, setRerender] = useState(false);
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: theme.layer.maxwidth, margin: 'auto' }}
    >
      <CreateOnlineProductCatalog setRerender={setRerender} />
      <OnlineProductTable setRerender={setRerender} />
    </motion.div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const resultOnlineProductCatalogs = await getData(QUERY_ONLINEPRODUCTCATALOG);
  const resultOnlineProduct = await getData(QUERY_ONLINEPRODUCT);

  let onlineProductCatalogs =
    resultOnlineProductCatalogs.data.onlineProductCatalog;

  let onlineProduct = resultOnlineProduct.data.onlineProduct;

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
    return { props: { user, onlineProductCatalogs, onlineProduct } };
  }
};

export default OnlineProduct;
