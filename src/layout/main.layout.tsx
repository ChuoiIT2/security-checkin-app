import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import SideNav from '@/components/side-nav';
import TopNav from '@/components/top-nav';
import { useAuth } from '@/hooks/use-auth';

interface MainLayoutProps {
  title: string;
  children: JSX.Element;
}

const MainLayout = (props: MainLayoutProps) => {
  const authQuery = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (authQuery.isError) {
      navigate('/auth/login');
    }
  }, [authQuery.isError, navigate]);

  return authQuery.isSuccess ? (
    <>
      <Helmet>
        <title>Yoo HomeIoT | {props.title}</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider collapsible collapsed={collapsed}>
          <SideNav />
        </Layout.Sider>

        <Layout>
          <TopNav collapsed={collapsed} setCollapse={setCollapsed} />

          <Layout.Content>{props.children}</Layout.Content>
        </Layout>
      </Layout>
    </>
  ) : (
    <></>
  );
};

export default MainLayout;
