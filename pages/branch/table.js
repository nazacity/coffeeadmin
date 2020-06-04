import React, { useEffect, useState } from 'react';
import cookie from 'cookie';

// next
import { useRouter } from 'next/router';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import { getUserByAccessToken } from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';

// Components
import TablePage from '../../components/branch/TablePage';

const BranchTable = ({ user }) => {
  const action = useDispatch();
  const [rerender, setRerender] = useState(false);

  const router = useRouter();
  useEffect(() => {
    action(setUser(user ? user : null));
  }, [user]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ marginBottom: 150 }}
    >
      <TablePage setRerender={setRerender} />
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

    if (!accessToken) {
      res.writeHead(302, { Location: '/' });
      res.end();
      return { props: {} };
    } else {
      const user = await getUserByAccessToken(accessToken);
      if (
        user.employee.position === 'waiter' ||
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

export default BranchTable;
