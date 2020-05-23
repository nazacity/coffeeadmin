import {
  SET_STOREPRODUCTCATALOG,
  CREATE_STOREPRODUCTCATALOG,
  DELETE_STOREPRODUCTCATALOG,
  SET_STOREPRODUCT,
  CREATE_STOREPRODUCT,
  DELETE_STOREPRODUCT,
  UPDATE_STOREPRODUCT,
} from '../types';

let INITIAL_STATE = {
  storeProductCatalogs: [],
  storeProducts: [],
  onlineProductCatalogs: [],
  onelineProducts: [],
};

const clientReducer = (state = INITIAL_STATE, action) => {
  let newProducts;
  let index;
  switch (action.type) {
    case SET_STOREPRODUCT:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, storeProducts: [...action.payload] };
    case SET_STOREPRODUCTCATALOG:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, storeProductCatalogs: [...action.payload] };
    case CREATE_STOREPRODUCTCATALOG:
      return {
        ...state,
        storeProductCatalogs: [...state.storeProductCatalogs, action.payload],
      };
    case DELETE_STOREPRODUCTCATALOG:
      let newCatalogs = state.catalogs.filter(
        (catalog) => catalog.id !== action.payload
      );
      return { ...state, storeProductCatalogs: newCatalogs };
    case CREATE_STOREPRODUCT:
      return {
        ...state,
        storeProducts: [...state.storeProducts, action.payload],
      };
    case UPDATE_STOREPRODUCT:
      newProducts = state.storeProducts;
      index = state.storeProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      newProducts[index] = action.payload;
      return { ...state, storeProducts: newProducts };
    case DELETE_STOREPRODUCT:
      newProducts = state.storeProducts.filter(
        (product) => product.id !== action.payload
      );

      return { ...state, storeProducts: newProducts };
    default:
      return state;
  }
};

export default clientReducer;
