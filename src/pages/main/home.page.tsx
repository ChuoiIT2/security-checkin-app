import { useMutation } from '@tanstack/react-query';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { Dialog, List, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';

import { calGeoDistance } from '@/base/helpers';
import ListItemSkeleton from '@/components/list-item-skeleton';
import LocationDetailView from '@/components/location-view';
import { AuthContext } from '@/services/auth/auth.context';
import useGetListCheckins from '@/services/checkins/checkin.query';
import checkinService from '@/services/checkins/checkin.service';
import { TLocationDto } from '@/services/locations/location.model';

const HomePage = () => {
  const [authState] = useContext(AuthContext);

  const [openningDialog, setOpenningDialog] = useState<boolean>(false);
  const [curGeoLocation, setCurGeoLocation] = useState<{
    longitude: number;
    latitude: number;
  }>();

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurGeoLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            Dialog.show({
              title: 'Permission denied',
              closeOnAction: true,
              closeOnMaskClick: true,
              content: 'Please allow location permission to continue!',
              actions: [
                [
                  {
                    key: 'ok',
                    text: 'OK',
                  },
                ],
              ],
            });
          }
        },
      );
    }
  }, [curGeoLocation]);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="m-2 rounded-xl p-2 bg-slate-200">
        <div className="rounded-xl overflow-hidden">
          <QrScanner
            onDecode={(qrString) => {
              try {
                setOpenningDialog(true);

                const result = JSON.parse(qrString) as TLocationDto;

                if (curGeoLocation) {
                  const distance = calGeoDistance(
                    result.latitude,
                    result.longitude,
                    curGeoLocation?.latitude,
                    curGeoLocation?.longitude,
                  );

                  if (distance > 0.1) {
                    Toast.show({
                      icon: 'fail',
                      content: `You are too far from ${result.name}!`,
                    });

                    return;
                  }
                }

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

      <div className="my-1"></div>

      <div className="flex justify-center items-center">
        <div className="text-slate-500 mr-2">Current geolocation:</div>
        <span className="text-blue-500 text-base">
          {curGeoLocation?.latitude.toFixed(4)}
          {', '}
          {curGeoLocation?.longitude.toFixed(4)}
        </span>
      </div>
      <div className="my-1"></div>

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
