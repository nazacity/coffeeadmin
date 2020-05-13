import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { setPromotions } from '../../redux/actions/promotionActions';
import { setProducts } from '../../redux/actions/productAction';

// MUI
import Hidden from '@material-ui/core/Hidden';

// framer motion
import { motion } from 'framer-motion';

// Apollo
import { getData, QUERY_PROMOTIONS, QUERY_PRODUCTS } from '../../apollo/db';
import MbPromotion from '../../components/promotion/MbPromotion';
import DtPromotion from '../../components/promotion/DtPromotion';

const Promotion = ({ promotions, products }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setPromotions(promotions));
    action(setProducts(products));
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

export const getStaticProps = async () => {
  const resultPromotions = await getData(QUERY_PROMOTIONS);
  const resultProducts = await getData(QUERY_PRODUCTS);
  let promotions = resultPromotions.data.promotion;
  let products = resultProducts.data.products;

  return { props: { promotions, products } };
};

export default Promotion;
