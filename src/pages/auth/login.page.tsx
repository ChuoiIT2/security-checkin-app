import { useMutation } from '@tanstack/react-query';
import { AutoCenter, Button, Form, Input, Switch, Toast } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { ToastHandler } from 'antd-mobile/es/components/toast';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import H1 from '@/components/h1';
import { TLoginDto } from '@/services/auth/auth.model';
import authService from '@/services/auth/auth.service';

const StyledDescription = styled.div`
  font-size: var(--adm-font-size-7);
  color: var(--adm-color-text-secondary);
`;

const LoginPage = () => {
  const toastHandler = useRef<ToastHandler>();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (input: TLoginDto) => authService.login(input),
    onMutate: () => {
      toastHandler.current = Toast.show({
        icon: 'loading',
        content: 'Waiting...',
        duration: 0,
      });
    },
    onSuccess: () => {
      Toast.show({
        icon: 'success',
        content: 'Login successfully',
        afterClose: () => {
          navigate('/');
        },
      });
    },
    onError: () => {
      Toast.show({
        icon: 'fail',
        content: 'Login failed',
        afterClose: () => {},
      });
    },
  });

  const [showPassword, setShowPassword] = useState(false);

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
        onFinish={(values) => {
          loginMutation.mutate(values);
        }}
        footer={
          <Button block type="submit" color="primary">
            Login
          </Button>
        }
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <div className="flex items-center">
            <Input
              className="flex-auto"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
            />
            <div className="flex-none ml-2 p-1 cursor-pointer">
              {!showPassword ? (
                <EyeInvisibleOutline
                  className="block text-sm"
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <EyeOutline
                  className="block text-sm"
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
          </div>
        </Form.Item>

        <Form.Item
          name="rememberMe"
          label="Remember me"
          childElementPosition="right"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginPage;
