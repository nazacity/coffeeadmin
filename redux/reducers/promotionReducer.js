import {
  SET_PROMOTIONS,
  CREATE_PROMOTION,
  DELETE_PROMOTION,
  UPDATE_PROMOTION,
} from '../types';
let INITIAL_STATE = [];

const promotionReducer = (state = INITIAL_STATE, action) => {
  let newPromotions;
  switch (action.type) {
    case SET_PROMOTIONS:
      if (action.payload === null) {
        return state;
      }
      return action.payload;
    case CREATE_PROMOTION:
      return [...state, action.payload];
    case UPDATE_PROMOTION:
      newPromotions = stat;
      let index = state.findIndex(
        (promotion) => promotion.id === action.payload.id
      );
      newPromotions[index] = action.payload;
      return newProducts;
    case DELETE_PROMOTION:
      newPromotions = state.filter(
        (promotion) => promotion.id !== action.payload
      );
      return newPromotions;
    default:
      return state;
  }
};

export default promotionReducer;
