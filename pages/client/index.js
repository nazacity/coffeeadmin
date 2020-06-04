import React, { useEffect } from 'react';
import { getUserByAccessToken, getUsersByAccessToken } from '../../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setClient } from '../../redux/actions/clientActions';

// MUI
import { useTheme } from '@material-ui/core/styles';

// framer motion
import { motion } from 'framer-motion';
import ClientTable from '../../components/client/ClientTable';

import cookie from 'cookie';

const Client = ({ user, client }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
    action(setClient(client ? client : null));
  }, [user, client]);
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: theme.layer.maxwidth,
        margin: '0 auto 1vh',
      }}
    >
      <ClientTable />
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
