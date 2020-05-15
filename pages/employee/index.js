import React, { useEffect } from 'react';
import cookie from 'cookie';

// MUI
import Hidden from '@material-ui/core/Hidden';

// Redux
import { useDispatch } from 'react-redux';
import { setEmployees } from '../../redux/actions/employeeActions';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import {
  getUserByAccessToken,
  getEmployeesByAccessToken,
} from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';
import MbEmployee from '../../components/employee/MbEmployee';

const index = ({ employees, user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setEmployees(employees));
    action(setUser(user ? user : null));
  }, [employees, user]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <MbEmployee />
      </Hidden>
      <Hidden mdUp>
        <div style={{ padding: '2vw' }}>
          <MbEmployee />
        </div>
      </Hidden>
    </motion.div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (!req.headers.cookie) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    const cookies = req.headers && cookie.parse(req.headers.cookie || '');

    const accessToken = cookies && cookies.accessToken;
    const uri = process.env.APOLLO_URL;

    if (!accessToken) {
      res.writeHead(302, { Location: '/' });
      res.end();
      return { props: {} };
    } else {
      const user = await getUserByAccessToken(accessToken);
      const employees = await getEmployeesByAccessToken(accessToken);
      if (user.state !== 'admin') {
        res.writeHead(302, { Location: '/' });
        res.end();
      }
      return { props: { user, employees } };
    }
  }
};

export default index;
