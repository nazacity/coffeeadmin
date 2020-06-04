import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import cookie from 'cookie';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setBranch } from '../../redux/actions/storeActions';
import { setStockCatalogs } from '../../redux/actions/stockActions';

import {
  getUserByAccessToken,
  getBranch,
  getStockCatalog,
} from '../../apollo/db';

// Components
import CreateStockCatalog from '../../components/stock/CreateStockCatalog';
import StockTable from '../../components/stock/StockTable';

// MUI
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

const Stock = ({ user, branch, stockCatalog }) => {
  const action = useDispatch();
  const branchs = useSelector((state) => state.store.branch);
  const theme = useTheme();

  const [state, setState] = useState(0);
  useEffect(() => {
    action(setUser(user ? user : null));
    action(setBranch(branch ? branch : null));
    action(setStockCatalogs(stockCatalog ? stockCatalog : null));
  }, [user, branch]);

  const [reRender, setRerender] = useState(false);

  const handleChange = (event, value) => {
    setState(value);
  };

  const handleChangeIndex = (index) => {
    setState(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Tabs
        value={state}
        variant="fullWidth"
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        style={{
          maxWidth: theme.layer.maxwidth,
          margin: '0 auto',
          boxShadow: theme.common.shadow.black,
        }}
      >
        {branchs.map((branch) => (
          <Tab label={branch.branch} key={branch.id} />
        ))}
        <Tab label="เพิ่มประเภทวัตถุดิบ" />
      </Tabs>
      <SwipeableViews
        index={state}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        {branchs.map((branch) => (
          <div key={branch.id}>
            <StockTable
              stock={branch.stock ? branch.stock : []}
              branchId={branch.id}
              setRerender={setRerender}
            />
          </div>
        ))}
        <div>
          <CreateStockCatalog setRerender={setRerender} />
        </div>
      </SwipeableViews>
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
    const branch = await getBranch(accessToken);
    const stockCatalog = await getStockCatalog(accessToken);
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return { props: { user, branch, stockCatalog } };
  }
};

export default Stock;
