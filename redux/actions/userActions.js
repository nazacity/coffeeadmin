import {
  SET_USER,
  SET_USERLOADING,
  SET_USER_SIGNOUT,
  SET_NAVBARINDEX,
} from '../types';
import Cookies from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';
import queryString from 'query-string';

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const userSignOut = () => async (dispatch) => {
  const accessToken = Cookies.get('accessToken');

  const res = await axios.post(
    'https://api.line.me/oauth2/v2.1/revoke',
    queryString.stringify({
      access_token: accessToken,
      client_id: process.env.LINE_CLIENT_KEY,
      client_secret: process.env.LINE_SECRET_KEY,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  if (res.status == 200) {
    Cookies.remove('accessToken');
    Router.push('/');
    dispatch({
      type: SET_NAVBARINDEX,
      payload: 0,
    });
    dispatch({
      type: SET_USERLOADING,
      payload: true,
    });
    dispatch({
      type: SET_USER_SIGNOUT,
    });
    setTimeout(() => {
      dispatch({
        type: SET_USERLOADING,
        payload: false,
      });
    }, 2000);
  }
};
