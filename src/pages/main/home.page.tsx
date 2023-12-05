import { QrScanner } from '@yudiel/react-qr-scanner';
import { AutoCenter, Button, List } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';

import ListItemSkeleton from '@/components/list-item-skeleton';
import useGetListCheckins from '@/services/checkins/checkin.query';

const HomePage = () => {
  const [curQR, setCurQR] = useState<string>('');
  console.log(curQR);

  const checkinsQuery = useGetListCheckins();

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="m-2 rounded-xl p-2 bg-slate-200">
        <div className="rounded-xl overflow-hidden">
          <QrScanner
            onDecode={(result) => setCurQR(result)}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      </div>

      <div className="my-2"></div>

      <List header="Checked in data">
        {checkinsQuery.isLoading &&
          [...Array(10)].map((_, index) => (
            <List.Item key={index}>
              <ListItemSkeleton key={index} animated />
            </List.Item>
          ))}
        {checkinsQuery.data?.items?.map((item) => (
          <List.Item
            key={item.id}
            description={dayjs(item.time).format('YYYY/MM/DD, HH:mm:ss')}
            clickable
          >
            {item.location.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default HomePage;
