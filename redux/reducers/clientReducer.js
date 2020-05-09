import { SET_CLIENT } from '../types';

let INITIAL_STATE = [];

const clientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLIENT:
      if (action.payload === null) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

export default clientReducer;
