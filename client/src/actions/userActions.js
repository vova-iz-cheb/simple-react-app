import { USER_INIT, LOGOUT } from '../constants';

export const logout = {
  type: LOGOUT,
};

export const userInit = user => {
  return {
    type: USER_INIT,
    user,
  };
};
