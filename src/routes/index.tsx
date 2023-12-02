import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/admin/home';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';

import Root from './root';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [{ path: '/', element: <HomePage /> }],
  },
  {
    path: 'auth',
    element: <Root />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);
