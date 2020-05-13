import { SET_EMPLOYEES, UPDATE_EMPLOYEE } from '../types';

export const setEmployees = (employees) => (dispatch) => {
  dispatch({
    type: SET_EMPLOYEES,
    payload: employees,
  });
};

export const updateEmployees = (employee) => (dispatch) => {
  dispatch({
    type: UPDATE_EMPLOYEE,
    payload: employee,
  });
};
