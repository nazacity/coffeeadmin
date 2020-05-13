import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { setProducts, setCatalogs } from '../../redux/actions/productAction';

// Apollo
import { getData, QUERY_PRODUCTS, QUERY_CATALOGS } from '../../apollo/db';

// MUI
import Hidden from '@material-ui/core/Hidden';

// Components
import DtProduct from '../../components/product/DtProduct';
import MbProduct from '../../components/product/MbProduct';

// framer motion
import { motion } from 'framer-motion';

const Product = ({ products, catalogs }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setCatalogs(catalogs));
    action(setProducts(products));
  }, [products, catalogs]);
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

export const getStaticProps = async () => {
  const resultProducts = await getData(QUERY_PRODUCTS);
  const resultCatalogs = await getData(QUERY_CATALOGS);
  let products = resultProducts.data.products;
  let catalogs = resultCatalogs.data.catalogs;
  console.log(resultProducts);
  // let result = [];
  // catalogs.map((catalog, i) => {
  //   result.push({
  //     name: catalog.name,
  //     data: products.filter((product) => product.catalog === catalog.name),
  //   });
  // });
  return { props: { products, catalogs } };
};

export default Product;
