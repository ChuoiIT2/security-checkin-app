import { SafeArea, TabBar } from 'antd-mobile';
import {
  AppOutline,
  SystemQRcodeOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDeviceType } from '@/hooks/use-device-type';

const StyledWrapper = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  height: calc(100vh - ${(props) => (props.isMobile ? '120px' : '0px')});
`;

const StyledTabBar = styled(TabBar)`
  border-top: solid 1px var(--adm-color-border);
  background-color: var(--adm-color-background);
`;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useDeviceType().isMobile();

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
        <Outlet />

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
