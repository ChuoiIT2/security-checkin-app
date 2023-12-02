import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import { AuthContext } from '@/services/auth/auth.provider';
import authService from '@/services/auth/auth.service';

export const useAuth = () => {
  const [authState, authDispatch] = useContext(AuthContext);

  const getUserInfo = async () => {
    try {
      const userData = await authService.getUserInfo();
      authDispatch({ type: 'setIsAuth', payload: true });
      authDispatch({ type: 'setCurrentUser', payload: userData });

      return userData;
    } catch (error) {
      authDispatch({ type: 'setIsAuth', payload: false });
      authDispatch({ type: 'setCurrentUser', payload: undefined });
      return Promise.reject(error);
    }
  };

  const authQuery = useQuery({
    enabled: !authState.isAuth,
    queryKey: ['auth/getUserInfo'],
    queryFn: () => getUserInfo(),
    retry: false,
  });

  return authQuery;
};
