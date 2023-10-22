import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CookiesProvider>
        <ToastContainer />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CookiesProvider>
    </>
  );
}
