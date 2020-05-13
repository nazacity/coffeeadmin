import { SET_EMPLOYEES, UPDATE_EMPLOYEE } from '../types';

let INITIAL_STATE = [];

const clientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      if (action.payload === null) {
        return state;
      }
      return action.payload;
    case UPDATE_EMPLOYEE:
      let newState = state;
      const index = state.findIndex(
        (employee) => employee.id === action.payload.id
      );
      newState[index] = { ...state[index], ...action.payload };
      return newState;
    default:
      return state;
  }
};

export default clientReducer;
