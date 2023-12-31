import { useQuery } from '@tanstack/react-query';
import { Dialog, List, PullToRefresh } from 'antd-mobile';

import ListItemSkeleton from '@/components/list-item-skeleton';
import LocationDetailView from '@/components/location-view';
import locationService from '@/services/locations/location.service';

const LocationPage = () => {
  const locationsQuery = useQuery({
    queryKey: ['locations/get-all'],
    queryFn: () =>
      locationService.getListLocations({
        limit: 1000,
      }),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-slate-50">
      <PullToRefresh onRefresh={() => locationsQuery.refetch()}>
        <h1 className="pl-2">Locations</h1>

        <List>
          {locationsQuery.isLoading &&
            [...Array(10)].map((_, index) => (
              <List.Item key={index}>
                <ListItemSkeleton key={index} animated />
              </List.Item>
            ))}
          {locationsQuery.data?.items?.map((location) => (
            <List.Item
              key={location.id}
              description={location.address}
              clickable
              onClick={() =>
                Dialog.show({
                  title: 'Location detail',
                  closeOnAction: true,
                  closeOnMaskClick: true,
                  content: (
                    <LocationDetailView location={location} showDescription />
                  ),
                  actions: [
                    [
                      {
                        key: 'ok',
                        text: 'Ok',
                      },
                    ],
                  ],
                })
              }
            >
              {location.name}
            </List.Item>
          ))}
        </List>
      </PullToRefresh>
    </div>
  );
};

export default LocationPage;
