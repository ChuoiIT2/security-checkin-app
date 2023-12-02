import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnlockFilled,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { App, Button, Layout } from 'antd';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18nKeys } from '@/i18n';
import { AuthContext } from '@/services/auth/auth.provider';
import authService from '@/services/auth/auth.service';

type TopNavProps = {
  collapsed: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopNav = ({ collapsed, setCollapse }: TopNavProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authDispatch = useContext(AuthContext)[1];
  const { notification } = App.useApp();

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      authDispatch({ type: 'logout' });
      navigate('/auth/login');
      notification.success({
        message: t(i18nKeys.auth.response.logoutSuccess),
      });
    },
    onError: () => {
      authDispatch({ type: 'logout' });
      navigate('/auth/login');
      notification.error({
        message: t(i18nKeys.common.errorOccurred),
      });
    },
  });

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return (
    <Layout.Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapse(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Button
        type="text"
        icon={<UnlockFilled />}
        onClick={() => handleLogout()}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Layout.Header>
  );
};

export default TopNav;
