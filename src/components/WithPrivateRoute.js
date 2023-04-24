import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const WithPrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        router.push('/');
      }
    });
  }, []);

  return <>{children}</>;
};

export default WithPrivateRoute;