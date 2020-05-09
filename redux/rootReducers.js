import { combineReducers } from 'redux';
import layoutReducer from './reducers/layoutReducer';
import userReducer from './reducers/userReducer';
import clientReducer from './reducers/clientReducer';
import reportDateReducer from './reducers/reportDateReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  user: userReducer,
  reportDate: reportDateReducer,
  clients: clientReducer,
});

export default rootReducer;
