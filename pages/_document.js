import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f3871ac61da1d89c70f8443be32766a9&libraries=services,clusterer&autoload=false"
            strategy="beforeInteractive"
        />
      </body>
    </Html>
  )
}
