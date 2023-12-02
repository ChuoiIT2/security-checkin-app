import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';

import './App.css';
import { router } from './routes';
import AuthProvider from './services/auth/auth.provider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdApp>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AntdApp>
    </QueryClientProvider>
  );
}

export default App;
