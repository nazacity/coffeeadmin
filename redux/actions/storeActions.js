import {
  SET_BRANCH,
  CREATE_BRANCH,
  DELETE_BRANCH,
  UPDATE_BRANCH,
  SET_TABLES,
  CREATE_TABLE,
  DELETE_TABLE,
  UPDATE_TABLE,
  UPDATE_TABLE_ORDER,
  CLEAR_TABLE,
} from '../types';

export const setBranch = (branch) => (dispatch) => {
  dispatch({
    type: SET_BRANCH,
    payload: branch,
  });
};

export const createBranchs = (branch) => (dispatch) => {
  dispatch({
    type: CREATE_BRANCH,
    payload: branch,
  });
};

export const updateBranch = (branch) => (dispatch) => {
  dispatch({
    type: UPDATE_BRANCH,
    payload: branch,
  });
};

export const deleteBranch = (id) => (dispatch) => {
  dispatch({
    type: DELETE_BRANCH,
    payload: id,
  });
};

export const setTables = (tables) => (dispatch) => {
  dispatch({
    type: SET_TABLES,
    payload: tables,
  });
};

export const createTables = (table) => (dispatch) => {
  dispatch({
    type: CREATE_TABLE,
    payload: table,
  });
};

export const updateTables = (table) => (dispatch) => {
  dispatch({
    type: UPDATE_TABLE,
    payload: table,
  });
};

export const updateTableOrder = (order) => (dispatch) => {
  dispatch({
    type: UPDATE_TABLE_ORDER,
    payload: order,
  });
};

export const clearTable = (place) => (dispatch) => {
  dispatch({
    type: CLEAR_TABLE,
    payload: place,
  });
};

export const deleteTables = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TABLE,
    payload: id,
  });
};
