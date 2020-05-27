import React, { useEffect, useState } from 'react';

import cookie from 'cookie';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import { getUserByAccessToken, getData, QUERY_BRANCHID } from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';

// Components
import OrderView from '../../components/kitchen/OrderView';

// MUI
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

const Kitchen = ({ branchs, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
  }, [user]);

  const [index, setIndex] = useState(0);

  const handleChange = (event, value) => {
    setIndex(value);
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Tabs value={index} variant="fullWidth" onChange={handleChange}>
        {branchs.map((branch) => (
          <Tab label={branch.branch} key={branch.id} />
        ))}
      </Tabs>
      <SwipeableViews
        index={index}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        {branchs.map((branch) => (
          <OrderView key={branch.id} branch={branch} />
        ))}
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
    const branchResult = await getData(QUERY_BRANCHID);

    const branchs = branchResult.data.branch;

    return { props: { user, branchs } };
  }
};

export default Kitchen;
