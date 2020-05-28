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

let INITIAL_STATE = {
  branch: [],
  tables: [],
};

const clientReducer = (state = INITIAL_STATE, action) => {
  let newProducts;
  let newBranch;
  let index;
  let indexBranch;
  let indexPlace;
  let newState;
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
      newBranch = { ...action.payload, place: [] };
      return { ...state, branch: [...state.branch, newBranch] };
    case UPDATE_BRANCH:
      index = state.branch.findIndex(
        (branch) => branch.id === action.payload.id
      );
      newBranch = state.branch;
      newBranch[index] = action.payload;
      return { ...state, branch: newBranch };
    case DELETE_BRANCH:
      newBranch = state.branch.filter((branch) => branch.id !== action.payload);
      return { ...state, catalogs: newBranch };
    case CREATE_TABLE:
      index = state.branch.findIndex(
        (branch) => branch.id === action.payload.id
      );
      newBranch = state.branch;
      newBranch[index] = action.payload;
      return { ...state, branch: newBranch };
    case UPDATE_TABLE:
      newTables = state.tables;
      index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      newProducts[index] = action.payload;
      return { ...state, tables: newProducts };
    case DELETE_TABLE:
      newProducts = state.tables.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, tables: newProducts };
    case UPDATE_TABLE_ORDER:
      indexBranch = state.branch.findIndex(
        (i) => i.id === action.payload.branch.id
      );
      indexPlace = state.branch[indexBranch].place.findIndex(
        (i) => i.id === action.payload.place.id
      );

      newState = state;
      newState.branch[indexBranch].place[indexPlace].order = {
        id: action.payload.id,
      };
      newState.branch[indexBranch].place[indexPlace].state =
        action.payload.place.state;
      return newState;
    case CLEAR_TABLE:
      indexBranch = state.branch.findIndex(
        (i) => i.id === action.payload.branch.id
      );
      indexPlace = state.branch[indexBranch].place.findIndex(
        (i) => i.id === action.payload.id
      );

      newState = state;
      newState.branch[indexBranch].place[indexPlace] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default clientReducer;
