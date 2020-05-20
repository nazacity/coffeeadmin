import {
  SET_STOCKCATALOG,
  CREATE_STOCKCATALOG,
  DELETE_STOCKCATALOG,
} from '../types';

let INITIAL_STATE = {
  stockCatalog: [],
  stocks: [],
};

const clientReducer = (state = INITIAL_STATE, action) => {
  let newProducts;
  switch (action.type) {
    case SET_STOCKCATALOG:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, stockCatalog: [...action.payload] };
    case CREATE_STOCKCATALOG:
      if (action.payload === undefined) {
        return state;
      }
      return {
        ...state,
        stockCatalog: [...state.stockCatalog, action.payload],
      };
    case DELETE_STOCKCATALOG:
      let newStockCatalogs = state.stockCatalog.filter(
        (catalog) => catalog.id !== action.payload
      );
      return { ...state, stockCatalogs: newStockCatalogs };
    default:
      return state;
  }
};

export default clientReducer;
