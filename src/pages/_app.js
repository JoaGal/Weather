import "@/styles/globals.css";
import "@/styles/register.css";
import "@/styles/loading.css";
import { UserContextProvider } from "@/context/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  );
}
