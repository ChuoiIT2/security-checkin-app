import { QrScanner } from '@yudiel/react-qr-scanner';

const ProfilePage = () => {
  return (
    <>
      <QrScanner
        onDecode={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />
      <h1>Profile page</h1>
    </>
  );
};

export default ProfilePage;
