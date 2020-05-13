import React, { useEffect } from 'react';
import cookie from 'cookie';

// MUI
import Hidden from '@material-ui/core/Hidden';

// Redux
import { useDispatch } from 'react-redux';
import { setEmployees } from '../../redux/actions/employeeActions';

// Apollo
import { getData, QUERY_EMPLOYEES } from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';
import MbEmployee from '../../components/employee/MbEmployee';

const index = ({ employees }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setEmployees(employees));
  }, [employees]);
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

    if (accessToken) {
      const response = await fetch(uri, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${accessToken}` || '',
        },
        body: JSON.stringify(QUERY_EMPLOYEES),
      });

      if (response.ok) {
        const result = await response.json();
        let employees = result.data.employees;
        return { props: { employees } };
      }
    }
    return { props: {} };
  }
};

export default index;
