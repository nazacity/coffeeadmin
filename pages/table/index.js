import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import cookie from 'cookie';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setBranch } from '../../redux/actions/storeActions';

import { getUserByAccessToken, getBranch } from '../../apollo/db';

// Components
import CreateBranch from '../../components/table/CreateBranch';
import CreateTable from '../../components/table/CreateTable';
import TableItem from '../../components/table/TableItem';

// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

const Table = ({ user, branch }) => {
  const action = useDispatch();
  const branchs = useSelector((state) => state.store.branch);
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1200down = useMediaQuery('(max-width:1200px)');

  const [state, setState] = useState(0);
  useEffect(() => {
    action(setUser(user ? user : null));
    action(setBranch(branch ? branch : null));
  }, [user, branch]);

  const [rerender, setRerender] = useState(false);

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
      <Tabs value={state} variant="fullWidth" onChange={handleChange}>
        {branchs.map((branch) => (
          <Tab label={branch.branch} key={branch.id} />
        ))}
        <Tab label="เพิ่มสาขา" />
      </Tabs>
      <SwipeableViews
        index={state}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        {branchs.map((branch) => (
          <div
            key={branch.id}
            style={{
              display: 'grid',
              gridTemplateColumns: matches600down
                ? '1fr 1fr'
                : matches1200down
                ? '1fr 1fr 1fr'
                : '1fr 1fr 1fr 1fr',
              gridGap: '1vh',
              padding: '1vh',
            }}
          >
            {branch.place &&
              branch.place.map((table) => (
                <TableItem
                  key={table.id}
                  table={table}
                  setRerender={setRerender}
                />
              ))}
          </div>
        ))}
        <div>
          <CreateBranch />
          <CreateTable setRerender={setRerender} />
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
    if (user.state !== 'admin') {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
    return { props: { user, branch } };
  }
};

export default Table;
