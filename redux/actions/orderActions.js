import { SET_ORDER, UPDATE_ORDER } from '../types';

export const setOrder = (client) => (dispatch) => {
  dispatch({
    type: SET_ORDER,
    payload: client,
  });
};

export const updateOrders = (client) => (dispatch) => {
  dispatch({
    type: UPDATE_ORDER,
    payload: client,
  });
};
