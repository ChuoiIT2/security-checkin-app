import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

interface MainLayoutProps {
  title: string;
  children: JSX.Element;
}

const AuthLayout = (props: MainLayoutProps) => {
  const navigate = useNavigate();
  const authQuery = useAuth();

  useEffect(() => {
    if (authQuery.isSuccess) {
      navigate('/');
    }
  }, [authQuery, navigate]);

  return (
    <>
      <Helmet>
        <title>Yoo HomeIoT | {props.title}</title>
      </Helmet>
      <div style={{ minHeight: '100vh' }}>{props.children}</div>
    </>
  );
};

export default AuthLayout;
