import React, { useEffect } from 'react';
import { getUserByAccessToken } from '../../apollo/db';
// Redux
import { useDispatch } from 'react-redux';
import { setPromotions } from '../../redux/actions/promotionActions';
import { setProducts } from '../../redux/actions/productAction';
import { setUser } from '../../redux/actions/userActions';

// MUI
import Hidden from '@material-ui/core/Hidden';

// framer motion
import { motion } from 'framer-motion';

// Apollo
import { getData, QUERY_PROMOTIONS, QUERY_PRODUCTS } from '../../apollo/db';
import MbPromotion from '../../components/promotion/MbPromotion';
import DtPromotion from '../../components/promotion/DtPromotion';

import cookie from 'cookie';

const Promotion = ({ promotions, products, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setPromotions(promotions));
    action(setProducts(products));
    action(setUser(user ? user : null));
  }, [promotions, products]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <DtPromotion />
      </Hidden>
      <Hidden mdUp>
        <div style={{ padding: '2vw' }}>
          <MbPromotion />
        </div>
      </Hidden>
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
    const resultPromotions = await getData(QUERY_PROMOTIONS);
    const resultProducts = await getData(QUERY_PRODUCTS);
    let promotions = resultPromotions.data.promotion;
    let products = resultProducts.data.products;
    const user = await getUserByAccessToken(accessToken);
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return { props: { user, promotions, products } };
  }
};

export default Promotion;
