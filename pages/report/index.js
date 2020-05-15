import React, { useEffect } from 'react';
import { getUserByAccessToken } from '../../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// MUI
import Hidden from '@material-ui/core/Hidden';

// framer motion
import { motion } from 'framer-motion';

// Components
import DtReport from '../../components/report/DtReport';
import MbReport from '../../components/report/MbReport';

import cookie from 'cookie';

const OrderList = ({ user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
  }, [user]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <DtReport />
      </Hidden>
      <Hidden mdUp>
        <MbReport />
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
    const user = await getUserByAccessToken(accessToken);
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return { props: { user } };
  }
};

export default OrderList;
