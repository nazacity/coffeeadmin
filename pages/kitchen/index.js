import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import 'moment/locale/th';
import moment from 'moment';
import cookie from 'cookie';

moment.locale('th');

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import { getUserByAccessToken } from '../../apollo/db';

import { db } from '../../firebase';

// MUI
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// framer motion
import { motion } from 'framer-motion';

// Components
import DtOrderList from '../../components/kitchen/DtOrderList';

const Kitchen = ({ orders, user }) => {
  const action = useDispatch();
  const theme = useTheme();
  const matches600down = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    action(setUser(user ? user : null));
  }, [orders, user]);
  const [state, setState] = useState([]);

  setTimeout(() => {
    db.ref('/order').on('value', (snapshot) => {
      let convertForm;
      convertForm = Object.values(snapshot.val());
      let rearrange = convertForm.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      let a = snapshot.val();
      let b;
      if (a !== b) {
        setState(rearrange);
        b = a;
      }
    });
  }, 5000);

  let orderCard = state.map((order) => {
    return <DtOrderList key={order.id} order={order} />;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        marginBottom: '200px',
        maxWidth: theme.layer.maxwidth,
        width: matches600down ? '100%' : '80%',
        margin: 'auto',
      }}
    >
      {orderCard}
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

    return { props: { user } };
  }
};

export default Kitchen;
