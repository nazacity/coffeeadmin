import React, { useEffect } from 'react';
import cookie from 'cookie';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import { getUserByAccessToken } from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';

const BranchKitchen = ({ user }) => {
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
      test
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
      if (
        user.employee.position === 'chef' ||
        user.employee.position === 'manager'
      ) {
        return { props: { user } };
      } else {
        res.writeHead(302, { Location: '/' });
        res.end();
      }
      return { props: {} };
    }
  }
};

export default BranchKitchen;
