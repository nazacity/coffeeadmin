import React, { useEffect } from 'react';

// MUI
import { useTheme } from '@material-ui/core/styles';

// Framer motion
import { motion } from 'framer-motion';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userActions';
import { setUserLoading } from '../redux/actions/layoutActions';

// Next
import { useRouter } from 'next/router';

// Apollo
import { useMutation } from '@apollo/react-hooks';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// components
import MbSignIn from '../components/homepage/signin/MbSignIn';
import DtSignIn from '../components/homepage/signin/DtSignIn';
import Chart from '../components/homepage/admin/Chart';
import DtBrief from '../components/homepage/admin/DtBrief';
import MbBrief from '../components/homepage/admin/MbBrief';
import NewClientReport from '../components/homepage/admin/NewClientReport';

// Other
import axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string';

import { MUTATION_SIGNINWITHACCESSTOKEN } from '../apollo/mutation';

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const theme = useTheme();
  const action = useDispatch();

  const [signinWithAccessToken, { loading, error }] = useMutation(
    MUTATION_SIGNINWITHACCESSTOKEN,
    {
      onCompleted: (data) => {
        action(setUser(data.signinWithAccessToken));
        action(setUserLoading(false));
      },
    }
  );

  const router = useRouter();
  useEffect(() => {
    if (router.query.code) {
      const lineRequest = {
        grant_type: 'authorization_code',
        code: router.query.code,
        redirect_uri: process.env.LINE_REDIRECT_URI,
        client_id: process.env.LINE_CLIENT_KEY,
        client_secret: process.env.LINE_SECRET_KEY,
      };
      //console.log(lineRequest);
      axios
        .post(
          'https://api.line.me/oauth2/v2.1/token',
          queryString.stringify(lineRequest),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          Cookies.set('accessToken', res.data.access_token);
          action(setUserLoading(true));
          signinWithAccessToken({
            variables: {
              accessToken: res.data.access_token,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  return (
    <React.Fragment>
      <Container maxWidth={false} style={{ margin: 0, padding: 0 }}>
        {userLoading
          ? 'loading...'
          : user?.state === 'guess' && (
              <React.Fragment>
                <Hidden smDown>
                  <DtSignIn />
                </Hidden>
                <Hidden mdUp>
                  <MbSignIn />
                </Hidden>
              </React.Fragment>
            )}
        <Hidden smDown>
          <motion.div
            style={{
              maxWidth: theme.layer.maxWidth,
              width: '80%',
              margin: 'auto',
              padding: '5vh 0',
            }}
          >
            {user?.state === 'employee' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                employee
              </motion.div>
            )}
            {user?.state === 'admin' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DtBrief />
                <Chart />
                <NewClientReport />
              </motion.div>
            )}
          </motion.div>
        </Hidden>
        <Hidden mdUp>
          <motion.div>
            {user?.state === 'employee' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                employee
              </motion.div>
            )}
            {user?.state === 'admin' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ marginBottom: 100 }}
              >
                <MbBrief />
                <Chart />
                <NewClientReport />
              </motion.div>
            )}
          </motion.div>
        </Hidden>
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
