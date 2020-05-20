import {
  SET_STOCKCATALOG,
  CREATE_STOCKCATALOG,
  DELETE_STOCKCATALOG,
} from '../types';

export const setStockCatalogs = (catalogs) => (dispatch) => {
  dispatch({
    type: SET_STOCKCATALOG,
    payload: catalogs,
  });
};

export const createStockCatalogs = (catalog) => (dispatch) => {
  dispatch({
    type: CREATE_STOCKCATALOG,
    payload: catalog,
  });
};

export const deleteStockCatalogs = (id) => (dispatch) => {
  dispatch({
    type: DELETE_STOCKCATALOG,
    payload: id,
  });
};
