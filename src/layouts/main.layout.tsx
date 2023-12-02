import { SafeArea, TabBar } from 'antd-mobile';
import {
  AppOutline,
  SystemQRcodeOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 120px);
`;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

      <StyledWrapper>
        <Outlet />

        <TabBar
          activeKey={location.pathname}
          onChange={(key) => {
            navigate(key);
          }}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </StyledWrapper>

      <SafeArea position="bottom" />
    </>
  );
};

export default MainLayout;
