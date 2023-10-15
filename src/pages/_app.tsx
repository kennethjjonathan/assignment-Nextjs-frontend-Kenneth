import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CookiesProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CookiesProvider>
    </>
  );
}
