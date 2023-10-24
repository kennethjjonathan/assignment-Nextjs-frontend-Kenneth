import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "@/components/loadingPage/LoadingPage";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
    };
    const stopLoading = () => {
      setIsLoading(false);
    };
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <CookiesProvider>
            <ToastContainer />
            <LoadingPage />
          </CookiesProvider>
        </>
      ) : (
        <>
          <CookiesProvider>
            <ToastContainer />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </CookiesProvider>
        </>
      )}
    </>
  );
}
