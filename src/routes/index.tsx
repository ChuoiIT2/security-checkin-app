import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/pages/auth/login.page';
import RegisterPage from '@/pages/auth/register.page';
import HomePage from '@/pages/main/home.page';

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
