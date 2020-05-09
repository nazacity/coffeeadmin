import { SET_STARTDATE, SET_ENDDATE } from '../types';

export const setStartDate = (date) => (dispatch) => {
  dispatch({
    type: SET_STARTDATE,
    payload: date,
  });
};

export const setEndDate = (date) => (dispatch) => {
  dispatch({
    type: SET_ENDDATE,
    payload: date,
  });
};
