import { AutoCenter, Button, Form, Input, Switch } from 'antd-mobile';
import styled from 'styled-components';

import H1 from '@/components/h1';

const StyledDescription = styled.div`
  font-size: var(--adm-font-size-7);
  color: var(--adm-color-text-secondary);
`;

const LoginPage = () => {
  return (
    <>
      <AutoCenter>
        <H1>Security Checkin</H1>
      </AutoCenter>
      <AutoCenter>
        <StyledDescription>Login to continue</StyledDescription>
      </AutoCenter>

      <Form
        mode="card"
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary">
            Login
          </Button>
        }
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="remember"
          label="Remember me"
          childElementPosition="right"
        >
          <Switch />
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginPage;
