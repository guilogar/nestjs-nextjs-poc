import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { availablePathWithoutLogin } from '../src/services/available-paths-without-login';
import { isSigned } from '../src/services/is-signed';

const App: NextPage = () => {
  const [isLog, setIsLog] = useState<Boolean>(isSigned());
  const router = useRouter();

  useEffect(() => {
    if (!isLog) {
      if (!availablePathWithoutLogin(router.pathname)) {
        router.push('/login');
      }
    } else {
      router.push('/home');
    }
  }, []);
  return <></>;
};

export default App;
