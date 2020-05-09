import {
  SET_NAVBARINDEX,
  SET_DRAWERTOPNAVBAR,
  SET_USERLOADING,
} from '../types';

const INITIAL_STATE = {
  drawerTopNavbarOpen: false,
  menuIndex: 0,
  userLoading: false,
};

const navbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NAVBARINDEX:
      return {
        ...state,
        menuIndex: action.payload,
      };
    case SET_DRAWERTOPNAVBAR:
      return {
        ...state,
        drawerTopNavbarOpen: !state.drawerTopNavbarOpen,
      };
    case SET_USERLOADING:
      return {
        ...state,
        userLoading: action.payload,
      };
    default:
      return state;
  }
};

export default navbarReducer;
