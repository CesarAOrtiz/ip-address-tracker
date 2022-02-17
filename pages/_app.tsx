import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IpInfoProvider } from "../contexts/IpInfoContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <IpInfoProvider>
            <Component {...pageProps} />
        </IpInfoProvider>
    );
}

export default MyApp;
