import { AutoCenter, Avatar, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { useContext } from 'react';

import { AuthContext } from '@/services/auth/auth.context';

const ProfilePage = () => {
  const [authState, dispatch] = useContext(AuthContext);
  const user = authState.currentUser;

  return (
    <div className="h-full bg-slate-50">
      <h1 className="pl-2">My profile</h1>

      <AutoCenter>
        <Avatar src={user?.imageUrl || ''} style={{ '--size': '64px' }} />
      </AutoCenter>

      <List header="Information">
        <List.Item extra={user?.name}>Name</List.Item>
        <List.Item extra={user?.email}>Email</List.Item>
        <List.Item extra={user?.username}>Username</List.Item>
        <List.Item extra={user?.phoneNumber}>Phone</List.Item>
        <List.Item extra={user?.gender}>Gender</List.Item>
        <List.Item extra={dayjs(user?.dateOfBirth).format('DD/MM/YYYY')}>
          Birthday
        </List.Item>
      </List>

      <List header="Settings">
        <List.Item clickable onClick={() => dispatch({ type: 'logout' })}>
          Logout
        </List.Item>
      </List>
    </div>
  );
};

export default ProfilePage;
