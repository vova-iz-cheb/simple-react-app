import { USER_INIT, LOGOUT } from '../constants';

const initialState = {
  login: '',
  id: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_INIT:
      return {
        login: action.user.login,
        id: action.user.id,
        reg_date: action.user.reg_date,
        avatar: action.user.avatar,
      };

    case LOGOUT:
      return {
        login: '',
        id: '',
        reg_date: '',
      };

    default:
      return state;
  }
};

export default user;
