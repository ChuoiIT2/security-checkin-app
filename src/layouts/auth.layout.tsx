import { SafeArea } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledAuthLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafbfc;
  height: 100vh;
`;

const AuthLayout = () => {
  return (
    <>
      <SafeArea position={'top'}></SafeArea>

      <StyledAuthLayout>
        <Outlet />
      </StyledAuthLayout>

      <SafeArea position={'bottom'}></SafeArea>
    </>
  );
};

export default AuthLayout;
