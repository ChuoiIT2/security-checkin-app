import { LockFilled, UserOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Flex, Form, Input, Layout } from 'antd';
import { useState } from 'react';

import LoadingModal from '@/components/loading-modal';
import AuthLayout from '@/layout/auth.layout';
import { ILoginPayload } from '@/services/auth/auth.model';
import authService from '@/services/auth/auth.service';

type LoginForm = {
  usernameOrEmail: string;
  password: string;
};

const LoginPage = () => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<LoginForm>();
  const { notification } = App.useApp();

  const [isModalVisible, setModalVisible] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (payload: ILoginPayload) => authService.login(payload),
    onSuccess: () => {
      notification.success({
        message: 'Login success!',
        placement: 'topRight',
      });
      queryClient.refetchQueries({ queryKey: ['auth/getUserInfo'] });
    },
    onError: () => {
      notification.error({
        message: 'Login failed!',
        placement: 'topRight',
      });
    },
  });

  const onFinish = async (values: LoginForm) => {
    loginMutation.mutate(values);
    setModalVisible(true);
  };

  const onFinishFailed = () => {
    notification.error({
      message: 'Missing required fields!',
      description: 'Please fill in all required fields!',
      placement: 'topRight',
    });
  };

  return (
    <>
      <AuthLayout title="Authentication">
        <Layout.Content
          style={{
            height: '100vh',
          }}
        >
          <Flex
            style={{ height: '100vh' }}
            vertical
            align="center"
            justify="center"
            gap="middle"
          >
            <Form
              form={form}
              layout="vertical"
              size="large"
              style={{ width: '30%' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item<LoginForm>
                label="Username or Email"
                name="usernameOrEmail"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username or email!',
                  },
                ]}
              >
                <Input
                  placeholder="Username or Email"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item<LoginForm>
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<LockFilled />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: '100%', marginTop: '10px' }}
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        </Layout.Content>
      </AuthLayout>

      <LoadingModal isModalVisible={isModalVisible} />
    </>
  );
};

export default LoginPage;
