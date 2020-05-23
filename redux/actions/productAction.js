import {
  SET_STOREPRODUCTCATALOG,
  CREATE_STOREPRODUCTCATALOG,
  DELETE_STOREPRODUCTCATALOG,
  SET_STOREPRODUCT,
  CREATE_STOREPRODUCT,
  DELETE_STOREPRODUCT,
  UPDATE_STOREPRODUCT,
  SET_ONLINEPRODUCTCATALOG,
  CREATE_ONLINEPRODUCTCATALOG,
  DELETE_ONLINEPRODUCTCATALOG,
  SET_ONLINEPRODUCT,
  CREATE_ONLINEPRODUCT,
  DELETE_ONLINEPRODUCT,
  UPDATE_ONLINEPRODUCT,
} from '../types';

// Store Product

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

// Online Product

export const setOnlineProductCatalogs = (catalogs) => (dispatch) => {
  dispatch({
    type: SET_ONLINEPRODUCTCATALOG,
    payload: catalogs,
  });
};

export const createOnlineProductCatalogs = (catalog) => (dispatch) => {
  dispatch({
    type: CREATE_ONLINEPRODUCTCATALOG,
    payload: catalog,
  });
};

export const deleteOnlineProductCatalogs = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ONLINEPRODUCTCATALOG,
    payload: id,
  });
};

export const setOnlineProducts = (products) => (dispatch) => {
  dispatch({
    type: SET_ONLINEPRODUCT,
    payload: products,
  });
};

export const createOnlineProducts = (product) => (dispatch) => {
  dispatch({
    type: CREATE_ONLINEPRODUCT,
    payload: product,
  });
};

export const updateOnlineProducts = (product) => (dispatch) => {
  dispatch({
    type: UPDATE_ONLINEPRODUCT,
    payload: product,
  });
};

export const deleteOnlineProducts = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ONLINEPRODUCT,
    payload: id,
  });
};
