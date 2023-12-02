import { useAsyncEffect } from 'ahooks';
import { Button, Picker } from 'antd-mobile';
import React, { useState } from 'react';

const HomePage = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [listVideoDevices, setListVideoDevices] = useState<MediaDeviceInfo[]>(
    [],
  );
  const [, setVideoLoaded] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<any>();

  useAsyncEffect(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    setListVideoDevices(
      devices.filter((device) => device.kind === 'videoinput'),
    );
  }, []);

  return (
    <div>
      <video
        className=""
        ref={videoRef}
        autoPlay
        playsInline
        onLoadedMetadata={(e) => {
          e.currentTarget.play();
        }}
      />

      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Select camera
      </Button>
      <Picker
        columns={[
          listVideoDevices.map((device) => ({
            label: device.label,
            value: device.deviceId,
          })),
        ]}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(v) => {
          setValue(v);
          setVideoLoaded(false);

          const deviceId = v[0];
          const device = listVideoDevices.find(
            (device) => device.deviceId === deviceId,
          );

          if (!device) {
            return;
          }

          navigator.mediaDevices
            .getUserMedia({
              audio: false,
              video: { deviceId: device?.deviceId },
            })
            .then((stream) => {
              if (!videoRef.current) {
                // alert('Failed to get video');
                console.log('Failed to get video');
                return;
              }

              const video = videoRef.current;
              video.srcObject = stream;

              setVideoLoaded(true);
            })
            .catch((err) => {
              console.error('error:', err);
            });
        }}
      />
    </div>
  );
};

export default HomePage;
