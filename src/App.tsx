import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import AuthProvider from './services/auth/auth.context';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={enUS}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
