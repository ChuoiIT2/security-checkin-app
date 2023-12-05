import React, { Dispatch, createContext, useReducer } from 'react';

import { TContextAction } from '@/base/base.model';

import { TAuthActionType, TAuthState } from './auth.model';
import authReducer from './auth.reducer';

const initialState: TAuthState = {
  isAuth: false,
  currentUser: null,
};

export const AuthContext = createContext<
  [state: TAuthState, dispatch: Dispatch<TContextAction<TAuthActionType>>]
>([initialState, () => null]);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
