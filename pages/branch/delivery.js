import React, { useEffect, useState } from 'react';
import cookie from 'cookie';

// Next
import { useRouter } from 'next/router';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// Apollo
import { getUserByAccessToken } from '../../apollo/db';

// framer motion
import { motion } from 'framer-motion';

// firebase
import { firestore } from '../../firebase';

// Components
import DeliveryList from '../../components/branch/DeliveryList';

const BranchDelivery = ({ user }) => {
  const action = useDispatch();
  const [state, setState] = useState([]);
  useEffect(() => {
    action(setUser(user ? user : null));
  }, [user]);
  const router = useRouter();
  const [branch, setBranch] = useState({ id: router.query.branch });

  useEffect(() => {
    firestore
      .collection(`delivery=${branch.id}`)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            firestore
              .collection(`delivery=${branch.id}`)
              .orderBy('createdAt', 'desc')
              .get()
              .then(async (snapshot) => {
                let data = [];
                if (!snapshot.empty) {
                  snapshot.forEach((doc) => {
                    data = [...data, { key: doc.id, ...doc.data() }];
                  });
                }
                setState(data);
              });
          }
          if (change.type === 'modified') {
            firestore
              .collection(`delivery=${branch.id}`)
              .orderBy('createdAt', 'desc')
              .get()
              .then(async (snapshot) => {
                let data = [];
                if (!snapshot.empty) {
                  snapshot.forEach((doc) => {
                    data = [...data, { key: doc.id, ...doc.data() }];
                  });
                }
                setState(data);
              });
          }
          if (change.type === 'removed') {
            firestore
              .collection(`delivery=${branch.id}`)
              .orderBy('createdAt', 'desc')
              .get()
              .then(async (snapshot) => {
                let data = [];
                if (!snapshot.empty) {
                  snapshot.forEach((doc) => {
                    data = [...data, { key: doc.id, ...doc.data() }];
                  });
                }
                setState(data);
              });
          }
        });
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {state &&
        state.map((order) => (
          <DeliveryList key={order.key} order={order} branchId={branch.id} />
        ))}
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
        user.employee.position === 'rider' ||
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

export default BranchDelivery;
