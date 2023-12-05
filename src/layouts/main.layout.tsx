import { SafeArea, TabBar, Toast } from 'antd-mobile';
import {
  LocationOutline,
  SetOutline,
  SystemQRcodeOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { ToastHandler } from 'antd-mobile/es/components/toast';
import { useEffect, useMemo, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useAuth from '@/hooks/use-auth';

const StyledTabBar = styled(TabBar)`
  border-top: solid 1px var(--adm-color-border);
  background-color: var(--adm-color-background);
`;

const MainLayout = () => {
  const toastHandler = useRef<ToastHandler>();

  const navigate = useNavigate();
  const location = useLocation();

  const authQuery = useAuth();

  useEffect(() => {
    if (authQuery.isLoading) {
      toastHandler.current = Toast.show({
        icon: 'loading',
      });
    }
    if (!authQuery.isLoading) {
      toastHandler.current?.close();
    }
    if (authQuery.isError) {
      navigate('/auth/login', { state: { redirect: location.pathname } });
    }
  }, [
    authQuery.isError,
    authQuery.isLoading,
    authQuery.isSuccess,
    location.pathname,
    navigate,
  ]);

  const tabs = useMemo(
    () => [
      {
        key: '/',
        title: 'Home',
        icon: <SystemQRcodeOutline />,
      },
      {
        key: '/locations',
        title: 'Locations',
        icon: <LocationOutline />,
      },
      {
        key: '/profile',
        title: 'Profile',
        icon: <UserOutline />,
      },
      {
        key: '/settings',
        title: 'Settings',
        icon: <SetOutline />,
      },
    ],
    [],
  );

  return (
    <>
      <SafeArea position="top" />

      <>
        <div className="h-[calc(100vh-120px)] flex flex-col justify-between">
          <div className="flex-1 flex flex-col bg-white overflow-scroll">
            <Outlet />
          </div>

          <StyledTabBar
            activeKey={location.pathname}
            onChange={(key) => {
              navigate(key);
            }}
          >
            {tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </StyledTabBar>
        </div>
      </>

      <SafeArea position="bottom" />
    </>
  );
};

export default MainLayout;
