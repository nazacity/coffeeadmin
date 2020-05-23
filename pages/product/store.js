import React, { useEffect, useState } from 'react';
import { getUserByAccessToken } from '../../apollo/db';
// Redux
import { useDispatch } from 'react-redux';
import {
  setStoreProducts,
  setStoreProductCatalogs,
} from '../../redux/actions/productAction';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import {
  getData,
  QUERY_STOREPRODUCTCATALOG,
  QUERY_STOREPRODUCT,
} from '../../apollo/db';

// MUI
import Hidden from '@material-ui/core/Hidden';

// framer motion
import { motion } from 'framer-motion';

import cookie from 'cookie';

// Components
import CreateStoreProductCatalog from '../../components/product/store/CreateStoreProductCatalog';
import StoreProductTable from '../../components/product/store/StoreProductTable';

const StoreProduct = ({ storeProductCatalogs, storeProduct, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setStoreProductCatalogs(storeProductCatalogs));
    action(setStoreProducts(storeProduct));
    action(setUser(user ? user : null));
  }, [storeProductCatalogs, user]);
  const [rerendet, setRerender] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CreateStoreProductCatalog setRerender={setRerender} />
      <StoreProductTable setRerender={setRerender} />
    </motion.div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const resultStoreProductCatalogs = await getData(QUERY_STOREPRODUCTCATALOG);
  const resultStoreProduct = await getData(QUERY_STOREPRODUCT);

  let storeProductCatalogs =
    resultStoreProductCatalogs.data.storeProductCatalog;

  let storeProduct = resultStoreProduct.data.storeProduct;

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
    return { props: { user, storeProductCatalogs, storeProduct } };
  }
};

export default StoreProduct;
