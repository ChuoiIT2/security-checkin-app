import { useQuery } from '@tanstack/react-query';

import checkinService from './checkin.service';

const useGetListCheckins = () =>
  useQuery({
    queryKey: ['checkins/get-all'],
    queryFn: () =>
      checkinService.getListCheckin({
        limit: 1000,
      }),
    refetchOnWindowFocus: false,
  });

export default useGetListCheckins;
