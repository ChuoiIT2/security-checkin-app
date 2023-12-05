import { List, PullToRefresh } from 'antd-mobile';
import dayjs from 'dayjs';

import ListItemSkeleton from '@/components/list-item-skeleton';
import useGetListCheckins from '@/services/checkins/checkin.query';

const CheckinPage = () => {
  const checkinsQuery = useGetListCheckins();

  return (
    <div className="bg-slate-50">
      <PullToRefresh onRefresh={() => checkinsQuery.refetch()}>
        <h1 className="pl-2">Checked in data</h1>

        <List>
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
            >
              {item.location.name}
            </List.Item>
          ))}
        </List>
      </PullToRefresh>
    </div>
  );
};

export default CheckinPage;
