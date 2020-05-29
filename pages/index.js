import React, { useEffect } from 'react';
import { getUserByAccessToken, getUsersByAccessToken } from '../apollo/db';

// MUI
import { useTheme } from '@material-ui/core/styles';

// Framer motion
import { motion } from 'framer-motion';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userActions';
import { setClient } from '../redux/actions/clientActions';
import { setUserLoading } from '../redux/actions/layoutActions';

// Next
import { useRouter } from 'next/router';

// Apollo
import { useMutation } from '@apollo/react-hooks';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import MbSignIn from '../components/homepage/signin/MbSignIn';
import DtSignIn from '../components/homepage/signin/DtSignIn';
import Chart from '../components/homepage/admin/Chart';
import Brief from '../components/homepage/admin/Brief';

// Other
import axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string';

// Other
import cookie from 'cookie';

import { MUTATION_SIGNINWITHACCESSTOKEN } from '../apollo/mutation';
import EmployeeInfo from '../components/homepage/employee/EmployeeInfo';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
  },
}));

const HomePage = ({ userFromAccessToken, client }) => {
  const user = useSelector((state) => state.user);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const classes = useStyles();
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const action = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    action(setClient(client ? client : null));
  }, [client]);

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
    action(setUser(userFromAccessToken));
    action(setUserLoading(false));
  }, [userFromAccessToken]);
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
              branch: 'online',
              table: '',
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ margin: 0, padding: 0 }}
    >
      {user?.state === 'guess' && !userLoading && (
        <React.Fragment>
          <Hidden smDown>
            <DtSignIn />
          </Hidden>
          <Hidden mdUp>
            <MbSignIn />
          </Hidden>
        </React.Fragment>
      )}
      {userLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            className={classes.top}
            size={matches600down ? 60 : 120}
            thickness={4}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.bottom}
            size={matches600down ? 60 : 120}
            thickness={4}
          />
        </div>
      )}
      <div
        style={{
          maxWidth: theme.layer.maxWidth,
          width: matches1024down ? undefined : '80%',
          margin: 'auto',
        }}
      >
        {user?.state === 'employee' && (
          <div>
            <EmployeeInfo />
          </div>
        )}
        {user?.state === 'admin' && (
          <div>
            <Brief />
            <Chart />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  if (!accessToken) {
    return { props: {} };
  } else {
    const user = await getUserByAccessToken(accessToken);
    const client = await getUsersByAccessToken(accessToken);

    return { props: { userFromAccessToken: user, client } };
  }
};

export default HomePage;
