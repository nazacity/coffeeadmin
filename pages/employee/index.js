import React, { useEffect } from 'react';
import cookie from 'cookie';

// Redux
import { useDispatch } from 'react-redux';
import { setEmployees } from '../../redux/actions/employeeActions';
import { setUser } from '../../redux/actions/userActions';
import { setBranch } from '../../redux/actions/storeActions';

// Apollo
import {
  getUserByAccessToken,
  getEmployeesByAccessToken,
  QUERY_BRANCHID,
  getData,
} from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';

// MUI
import { useTheme } from '@material-ui/core/styles';

// Component
import EmployeeTable from '../../components/employee/EmployeeTable';

const index = ({ employees, user, branch }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setEmployees(employees));
    action(setUser(user ? user : null));
    action(setBranch(branch ? branch : null));
  }, [employees, user]);
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
      <EmployeeTable />
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
      const result = await getData(QUERY_BRANCHID);
      const { branch } = result.data;
      if (user.state !== 'admin') {
        res.writeHead(302, { Location: '/' });
        res.end();
      }
      return { props: { user, employees, branch } };
    }
  }
};

export default index;
