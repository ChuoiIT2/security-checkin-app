import { TContextAction } from '@/base/base.model';

import { TAuthActionType, TAuthState } from './auth.model';
import authService from './auth.service';

const authReducer = (
  state: TAuthState,
  action: TContextAction<TAuthActionType>,
): TAuthState => {
  switch (action.type) {
    case 'logout': {
      authService.logout();

      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };
    }

    case 'setIsAuth': {
      return {
        ...state,
        isAuth: action.payload,
      };
    }

    case 'setCurrentUser': {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
