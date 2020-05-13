import {
  SET_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_CATALOG,
  CREATE_CATALOG,
  DELETE_CATALOG,
  UPDATE_PRODUCT,
} from '../types';

let INITIAL_STATE = {
  products: [],
  catalogs: [],
};

const clientReducer = (state = INITIAL_STATE, action) => {
  let newProducts;
  switch (action.type) {
    case SET_PRODUCT:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, products: [...action.payload] };
    case SET_CATALOG:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, catalogs: [...action.payload] };
    case CREATE_CATALOG:
      return { ...state, catalogs: [...state.catalogs, action.payload] };
    case DELETE_CATALOG:
      let newCatalogs = state.catalogs.filter(
        (catalog) => catalog.id !== action.payload
      );
      return { ...state, catalogs: newCatalogs };
    case CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case UPDATE_PRODUCT:
      newProducts = state.products;
      let index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      newProducts[index] = action.payload;
      return { ...state, products: newProducts };
    case DELETE_PRODUCT:
      newProducts = state.products.filter(
        (product) => product.id !== action.payload
      );

      return { ...state, products: newProducts };
    default:
      return state;
  }
};

export default clientReducer;
