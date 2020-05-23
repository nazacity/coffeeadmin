import {
  SET_STOREPRODUCTCATALOG,
  CREATE_STOREPRODUCTCATALOG,
  DELETE_STOREPRODUCTCATALOG,
  SET_STOREPRODUCT,
  CREATE_STOREPRODUCT,
  DELETE_STOREPRODUCT,
  UPDATE_STOREPRODUCT,
} from '../types';

export const setStoreProductCatalogs = (catalogs) => (dispatch) => {
  dispatch({
    type: SET_STOREPRODUCTCATALOG,
    payload: catalogs,
  });
};

export const createStoreProductCatalogs = (catalog) => (dispatch) => {
  dispatch({
    type: CREATE_STOREPRODUCTCATALOG,
    payload: catalog,
  });
};

export const deleteStoreProductCatalogs = (id) => (dispatch) => {
  dispatch({
    type: DELETE_STOREPRODUCTCATALOG,
    payload: id,
  });
};

export const setStoreProducts = (products) => (dispatch) => {
  dispatch({
    type: SET_STOREPRODUCT,
    payload: products,
  });
};

export const createStoreProducts = (product) => (dispatch) => {
  dispatch({
    type: CREATE_STOREPRODUCT,
    payload: product,
  });
};

export const updateStoreProducts = (product) => (dispatch) => {
  dispatch({
    type: UPDATE_STOREPRODUCT,
    payload: product,
  });
};

export const deleteStoreProducts = (id) => (dispatch) => {
  dispatch({
    type: DELETE_STOREPRODUCT,
    payload: id,
  });
};
