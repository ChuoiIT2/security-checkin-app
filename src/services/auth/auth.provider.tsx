import React, { Dispatch, createContext, useReducer } from 'react';

import { IContextAction } from '@/base/base.model';

import { IAuthState, TAuthActionType } from './auth.model';
import authReducer from './auth.reducer';

const initialState: IAuthState = {
  tenantId: undefined,
  isAuth: false,
  currentUser: undefined,
};

export const AuthContext = createContext<
  [state: IAuthState, dispatch: Dispatch<IContextAction<TAuthActionType>>]
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
