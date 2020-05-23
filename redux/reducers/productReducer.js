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

let INITIAL_STATE = {
  storeProductCatalogs: [],
  storeProducts: [],
  onlineProductCatalogs: [],
  onlineProducts: [],
};

const clientReducer = (state = INITIAL_STATE, action) => {
  let newProducts;
  let index;
  let newCatalogs;
  switch (action.type) {
    // Store Product
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
      newCatalogs = state.storeProductCatalogs.filter(
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
      let newCatalogs = state.storeProductCatalogs.filter(
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

    //OnlineProduct

    case SET_ONLINEPRODUCT:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, onlineProducts: [...action.payload] };
    case SET_ONLINEPRODUCTCATALOG:
      if (action.payload === undefined) {
        return state;
      }
      return { ...state, onlineProductCatalogs: [...action.payload] };
    case CREATE_ONLINEPRODUCTCATALOG:
      return {
        ...state,
        onlineProductCatalogs: [...state.onlineProductCatalogs, action.payload],
      };
    case DELETE_ONLINEPRODUCTCATALOG:
      newCatalogs = state.onlineProductCatalogs.filter(
        (catalog) => catalog.id !== action.payload
      );
      return { ...state, onlineProductCatalogs: newCatalogs };
    case CREATE_ONLINEPRODUCT:
      return {
        ...state,
        onlineProducts: [...state.onlineProducts, action.payload],
      };
    case UPDATE_ONLINEPRODUCT:
      newProducts = state.onlineProducts;
      index = state.onlineProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      newProducts[index] = action.payload;
      return { ...state, onlineProducts: newProducts };
    case DELETE_ONLINEPRODUCT:
      newProducts = state.onlineProducts.filter(
        (product) => product.id !== action.payload
      );

      return { ...state, onlineProducts: newProducts };
    default:
      return state;
  }
};

export default clientReducer;
