import React, { useEffect } from 'react';
import { getUserByAccessToken } from '../../apollo/db';
// Redux
import { useDispatch } from 'react-redux';
import { setProducts, setCatalogs } from '../../redux/actions/productAction';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import { getData, QUERY_PRODUCTS, QUERY_CATALOGS } from '../../apollo/db';

// MUI
import Hidden from '@material-ui/core/Hidden';

// Components
import DtProduct from '../../components/product/DtProduct';
import MbProduct from '../../components/product/MbProduct';

// framer motion
import { motion } from 'framer-motion';

import cookie from 'cookie';

const Product = ({ products, catalogs, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setCatalogs(catalogs));
    action(setProducts(products));
    action(setUser(user ? user : null));
  }, [products, catalogs, user]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <DtProduct />
      </Hidden>
      <Hidden mdUp>
        <div style={{ padding: '2vw' }}>
          <MbProduct />
        </div>
      </Hidden>
    </motion.div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const resultProducts = await getData(QUERY_PRODUCTS);
  const resultCatalogs = await getData(QUERY_CATALOGS);
  let products = resultProducts.data.products;
  let catalogs = resultCatalogs.data.catalogs;

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
    return { props: { products, catalogs, user } };
  }
};

export default Product;
