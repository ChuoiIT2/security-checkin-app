import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '@/layouts/auth.layout';
import MainLayout from '@/layouts/main.layout';
import LoginPage from '@/pages/auth/login.page';
import RegisterPage from '@/pages/auth/register.page';
import CheckinPage from '@/pages/main/checkin.page';
import HomePage from '@/pages/main/home.page';
import LocationPage from '@/pages/main/location.page';
import ProfilePage from '@/pages/main/profile.page';

export const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/locations', element: <LocationPage /> },
      { path: '/checkins', element: <CheckinPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);
