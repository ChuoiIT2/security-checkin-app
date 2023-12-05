import { useQuery } from '@tanstack/react-query';
import { List, PullToRefresh, Skeleton } from 'antd-mobile';
import styled from 'styled-components';

import locationService from '@/services/locations/location.service';

const StyledSkeleton = styled(Skeleton)`
  --width: 100%;
  --height: 50px;
  --border-radius: 8px;
`;

const LocationPage = () => {
  const locationsQuery = useQuery({
    queryKey: ['locations/get-all'],
    queryFn: () =>
      locationService.getListLocations({
        limit: 1000,
      }),
    refetchOnWindowFocus: false,
  });

  console.log(locationsQuery.data?.items);

  return (
    <div className="bg-slate-50">
      <PullToRefresh onRefresh={() => locationsQuery.refetch()}>
        <h1 className="pl-2">Locations</h1>

        <List>
          {locationsQuery.isLoading &&
            [...Array(10)].map((_, index) => (
              <List.Item key={index}>
                <StyledSkeleton key={index} animated />
              </List.Item>
            ))}
          {locationsQuery.data?.items?.map((location) => (
            <List.Item
              key={location.id}
              description={location.address}
              clickable
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
