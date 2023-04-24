import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { verifyUser } from "@/firebase/auth";

const WithPrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    verifyUser(router);
  }, []);

  return <>{children}</>;
};

export default WithPrivateRoute;