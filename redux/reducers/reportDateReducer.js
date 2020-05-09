import { SET_STARTDATE, SET_ENDDATE } from '../types';
import moment from 'moment';

const now = moment(new Date().getTime());
const endDate = parseFloat(now.format('x'));
// const startDate = parseFloat(
//   now
//     .set({ date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 })
//     .format('x')
// );
const startDate = parseFloat(
  now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('x')
);

const INITIAL_STATE = {
  startDate,
  endDate,
};

const reportDateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STARTDATE:
      return {
        ...state,
        startDate: action.payload,
      };
    case SET_ENDDATE:
      return {
        ...state,
        endDate: action.payload,
      };
    default:
      return state;
  }
};

export default reportDateReducer;
