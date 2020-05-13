import {
  SET_PROMOTIONS,
  CREATE_PROMOTION,
  DELETE_PROMOTION,
  UPDATE_PROMOTION,
} from '../types';

export const setPromotions = (promotions) => (dispatch) => {
  dispatch({
    type: SET_PROMOTIONS,
    payload: promotions,
  });
};

export const createPromotions = (promotion) => (dispatch) => {
  dispatch({
    type: CREATE_PROMOTION,
    payload: promotion,
  });
};

export const updatePromotions = (promotion) => (dispatch) => {
  dispatch({
    type: UPDATE_PROMOTION,
    payload: promotion,
  });
};

export const deletePromotions = (id) => (dispatch) => {
  dispatch({
    type: DELETE_PROMOTION,
    payload: id,
  });
};
