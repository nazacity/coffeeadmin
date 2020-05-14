import { SET_ORDER, UPDATE_ORDER } from '../types';

let INITIAL_STATE = [];

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ORDER:
      if (action.payload === null) {
        return state;
      }
      return action.payload;
    case UPDATE_ORDER:
      let newState = state;
      const index = state.findIndex((order) => order.id === action.payload.id);
      newState[index] = { ...state[index], ...action.payload };
      return newState;
    default:
      return state;
  }
};

export default orderReducer;
