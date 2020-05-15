import React, { useEffect } from 'react';
import { getUserByAccessToken, getUsersByAccessToken } from '../../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setClient } from '../../redux/actions/clientActions';

// MUI
import Hidden from '@material-ui/core/Hidden';

// framer motion
import { motion } from 'framer-motion';
import MbClient from '../../components/client/MbClient';

import cookie from 'cookie';

const Client = ({ user, client }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
    action(setClient(client ? client : null));
  }, [user, client]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <MbClient />
      </Hidden>
      <Hidden mdUp>
        <div style={{ padding: '2vw' }}>
          <MbClient />
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
    const user = await getUserByAccessToken(accessToken);
    const client = await getUsersByAccessToken(accessToken);
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return { props: { user, client } };
  }
};

export default Client;
