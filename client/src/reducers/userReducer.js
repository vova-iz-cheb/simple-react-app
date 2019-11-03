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
      };

    case LOGOUT:
      return {
        login: '',
        id: '',
      };

    default:
      return state;
  }
};

export default user;
