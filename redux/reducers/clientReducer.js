import { SET_CLIENT, UPDATE_CLIENT } from '../types';

let INITIAL_STATE = [];

const clientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLIENT:
      if (action.payload === null) {
        return state;
      }
      return action.payload;
    case UPDATE_CLIENT:
      let newState = state;
      const index = state.findIndex(
        (client) => client.id === action.payload.id
      );
      newState[index] = { ...state[index], ...action.payload };
      return newState;
    default:
      return state;
  }
};

export default clientReducer;
