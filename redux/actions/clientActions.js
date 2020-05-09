import { SET_CLIENT } from '../types';

export const setClient = (client) => (dispatch) => {
  dispatch({
    type: SET_CLIENT,
    payload: client,
  });
};
