import '@/styles/globals.css'
import {PortfolioProvider} from "../context/context";
import {prefix} from "../config/config";

export default function App({Component, pageProps}) {
    return (
        <PortfolioProvider value={{prefix}}>
            <Component {...pageProps} />
        </PortfolioProvider>
    );
}
