import { useMutation } from '@tanstack/react-query';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { Dialog, List, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';

import ListItemSkeleton from '@/components/list-item-skeleton';
import LocationDetailView from '@/components/location-view';
import { AuthContext } from '@/services/auth/auth.context';
import useGetListCheckins from '@/services/checkins/checkin.query';
import checkinService from '@/services/checkins/checkin.service';
import { TLocationDto } from '@/services/locations/location.model';

const HomePage = () => {
  const [authState] = useContext(AuthContext);

  const [openningDialog, setOpenningDialog] = useState<boolean>(false);

  const checkinsQuery = useGetListCheckins();

  const checkinMutation = useMutation({
    mutationFn: (location: TLocationDto) =>
      authState.currentUser?.id
        ? checkinService.createCheckin({
            userId: authState.currentUser.id,
            locationId: location.id,
          })
        : Promise.reject(),
    onSuccess: async () => {
      await checkinsQuery.refetch();
      Toast.show({
        icon: 'success',
        content: 'Checkin successfully!',
      });
    },
    onError: (error) => {
      Toast.show({
        icon: 'fail',
        content: error?.message || 'Something went wrong!',
      });
    },
  });

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="m-2 rounded-xl p-2 bg-slate-200">
        <div className="rounded-xl overflow-hidden">
          <QrScanner
            onDecode={(qrString) => {
              try {
                setOpenningDialog(true);

                const result = JSON.parse(qrString) as TLocationDto;

                if (openningDialog) {
                  return;
                }

                Dialog.show({
                  title: 'Confirm checkin',
                  closeOnAction: true,
                  closeOnMaskClick: true,
                  onClose: () => {
                    setOpenningDialog(false);
                  },
                  content: <LocationDetailView location={result} />,
                  actions: [
                    [
                      {
                        danger: true,
                        key: 'cancel',
                        text: 'Cancel',
                      },
                      {
                        key: 'confirm',
                        text: 'Confirm',
                        onClick: async () => {
                          await checkinMutation.mutateAsync(result);

                          setOpenningDialog(false);
                        },
                      },
                    ],
                  ],
                });
              } catch (error) {
                return;
              }
            }}
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
          >
            {item.location.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default HomePage;
