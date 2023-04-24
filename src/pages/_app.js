import "@/styles/globals.css";
import "@/styles/register.css";
import "@/styles/loading.css";
import { UserContextProvider } from "@/context/context";
import WithPrivateRoute from "@/components/WithPrivateRoute";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <WithPrivateRoute>
        <Component {...pageProps} />
      </WithPrivateRoute>
    </UserContextProvider>
  );
}
