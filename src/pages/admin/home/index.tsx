import { Typography } from 'antd';

import MainLayout from '@/layout/main.layout';

const HomePage = () => {
  return (
    <MainLayout title={'Home'}>
      <div>
        <Typography.Title type="success" level={2}>
          Home
        </Typography.Title>
      </div>
    </MainLayout>
  );
};

export default HomePage;
