import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import "../styles/globals.scss";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo
				defaultTitle="Clari's Clouds"
				titleTemplate="%s – Clari's Clouds"
			/>
			<Component {...pageProps} />
		</>
	);
}

export default CustomApp;
