import { SET_CLIENT, UPDATE_CLIENT } from '../types';

export const setClient = (client) => (dispatch) => {
  dispatch({
    type: SET_CLIENT,
    payload: client,
  });
};

export const updateClient = (client) => (dispatch) => {
  dispatch({
    type: UPDATE_CLIENT,
    payload: client,
  });
};
