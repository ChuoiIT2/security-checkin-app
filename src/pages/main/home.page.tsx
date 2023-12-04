import { QrScanner } from '@yudiel/react-qr-scanner';
import { AutoCenter, Button } from 'antd-mobile';
import { useState } from 'react';

const HomePage = () => {
  const [curResult, setCurResult] = useState<string>('');

  return (
    <div className="h-full flex flex-col bg-slate-50 p-2">
      <div className="rounded-md overflow-hidden">
        <QrScanner
          onDecode={(result) => setCurResult(result)}
          onError={(error) => console.log(error?.message)}
        />

        <div className="bg-white p-2">
          <p className="text-sm text-gray-500">Result:</p>
          <p className="text-lg text-gray-700">{curResult}</p>
        </div>

        <div className="my-2"></div>

        <AutoCenter>
          <Button color="primary" fill="solid">
            Save
          </Button>
        </AutoCenter>
      </div>
    </div>
  );
};

export default HomePage;
