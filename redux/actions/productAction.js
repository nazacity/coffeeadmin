import {
  SET_PRODUCT,
  SET_CATALOG,
  CREATE_CATALOG,
  DELETE_CATALOG,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../types';

export const setCatalogs = (catalogs) => (dispatch) => {
  dispatch({
    type: SET_CATALOG,
    payload: catalogs,
  });
};

export const createCatalogs = (catalog) => (dispatch) => {
  dispatch({
    type: CREATE_CATALOG,
    payload: catalog,
  });
};

export const deleteCatalogs = (id) => (dispatch) => {
  dispatch({
    type: DELETE_CATALOG,
    payload: id,
  });
};

export const setProducts = (products) => (dispatch) => {
  dispatch({
    type: SET_PRODUCT,
    payload: products,
  });
};

export const createProducts = (product) => (dispatch) => {
  dispatch({
    type: CREATE_PRODUCT,
    payload: product,
  });
};

export const updateProducts = (product) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT,
    payload: product,
  });
};

export const deleteProducts = (id) => (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
};
