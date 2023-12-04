import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';

import { AuthContext } from '@/services/auth/auth.context';
import authService from '@/services/auth/auth.service';

const useAuth = () => {
  const [authState, authDispatch] = useContext(AuthContext);

  const authQuery = useQuery({
    enabled: !authState.isAuth,
    queryKey: ['auth/getUserInfo'],
    queryFn: () => authService.getUserInfo(),
  });

  useEffect(() => {
    if (authQuery.isSuccess) {
      authDispatch({ type: 'setIsAuth', payload: true });
      authDispatch({ type: 'setCurrentUser', payload: authQuery.data });
    } else {
      authDispatch({ type: 'setIsAuth', payload: false });
      authDispatch({ type: 'setCurrentUser', payload: null });
    }
  }, [authDispatch, authQuery.data, authQuery.isSuccess]);

  return authQuery;
};

export default useAuth;
