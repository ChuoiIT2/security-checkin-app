import { SafeArea, TabBar, Toast } from 'antd-mobile';
import {
  AppOutline,
  SystemQRcodeOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { ToastHandler } from 'antd-mobile/es/components/toast';
import { useEffect, useMemo, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useAuth from '@/hooks/use-auth';
import { useDeviceType } from '@/hooks/use-device-type';

const StyledWrapper = styled.div<{ isMobile?: boolean }>`
  height: calc(100vh - ${(props) => (props.isMobile ? '120px' : '0px')});
`;

const StyledTabBar = styled(TabBar)`
  border-top: solid 1px var(--adm-color-border);
  background-color: var(--adm-color-background);
`;

const MainLayout = () => {
  const toastHandler = useRef<ToastHandler>();

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useDeviceType().isMobile();

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
        key: '/profile',
        title: 'Profile',
        icon: <UserOutline />,
      },
      {
        key: '/settings',
        title: 'Settings',
        icon: <AppOutline />,
      },
    ],
    [],
  );

  return (
    <>
      <SafeArea position="top" />

      <StyledWrapper isMobile={isMobile}>
        <div className="h-full flex flex-col bg-white">
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
      </StyledWrapper>

      <SafeArea position="bottom" />
    </>
  );
};

export default MainLayout;
