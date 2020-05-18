import {
  SET_BRANCH,
  CREATE_BRANCH,
  DELETE_BRANCH,
  SET_TABLES,
  CREATE_TABLE,
  DELETE_TABLE,
  UPDATE_TABLE,
} from '../types';

let INITIAL_STATE = {
  branch: [],
  tables: [],
};

const clientReducer = (state = INITIAL_STATE, action) => {
  let newProducts;
  switch (action.type) {
    case SET_BRANCH:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, branch: [...action.payload] };
    case SET_TABLES:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, tabless: [...action.payload] };
    case CREATE_BRANCH:
      return { ...state, branch: [...state.catalogs, action.payload] };
    case DELETE_BRANCH:
      let newBranch = state.branch.filter(
        (branch) => branch.id !== action.payload
      );
      return { ...state, catalogs: newBranch };
    case CREATE_TABLE:
      return { ...state, tables: [...state.tables, action.payload] };
    case UPDATE_TABLE:
      newProducts = state.tables;
      let index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      newProducts[index] = action.payload;
      return { ...state, tables: newProducts };
    case DELETE_TABLE:
      newProducts = state.tables.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, tables: newProducts };
    default:
      return state;
  }
};

export default clientReducer;
