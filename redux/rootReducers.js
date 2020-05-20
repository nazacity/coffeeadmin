import { combineReducers } from 'redux';
import layoutReducer from './reducers/layoutReducer';
import userReducer from './reducers/userReducer';
import clientReducer from './reducers/clientReducer';
import reportDateReducer from './reducers/reportDateReducer';
import productReducer from './reducers/productReducer';
import promotionReducer from './reducers/promotionReducer';
import employeeReducer from './reducers/employeeReducer';
import orderReducer from './reducers/orderReducer';
import storeReducer from './reducers/storeReducer';
import stockReducer from './reducers/stockReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  user: userReducer,
  reportDate: reportDateReducer,
  clients: clientReducer,
  products: productReducer,
  promotions: promotionReducer,
  employees: employeeReducer,
  orders: orderReducer,
  store: storeReducer,
  stock: stockReducer,
});

export default rootReducer;
