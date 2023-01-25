import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Script from 'next/script';
import Skeleton from 'react-loading-skeleton'
import NextNProgress from 'nextjs-progressbar';

export default function App({Component, pageProps}: AppProps) {


    return (
        <>
            <Component {...pageProps} />
            <Script strategy='beforeInteractive'
                    src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wz1qow4hwj"
            />
        </>
    );
}
