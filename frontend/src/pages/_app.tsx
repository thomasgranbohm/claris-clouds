import type { AppProps } from "next/app";

import "../styles/globals.scss";

function CustomApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default CustomApp;
