import { combineReducers } from 'redux';
import layoutReducer from './reducers/layoutReducer';
import userReducer from './reducers/userReducer';
import clientReducer from './reducers/clientReducer';
import reportDateReducer from './reducers/reportDateReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  user: userReducer,
  reportDate: reportDateReducer,
  clients: clientReducer,
  products: productReducer,
});

export default rootReducer;
