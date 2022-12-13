import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import { LayoutProps } from "components/Layout";

import stripWrapper from "utils/stripWrapper";

import "../styles/globals.scss";

function CustomApp({
	Component,
	pageProps,
}: AppProps<{ layout: LayoutProps }>) {
	const { layout } = pageProps;
	const { favicon } = layout;
	const strippedFavicon = stripWrapper(favicon);

	return (
		<>
			<DefaultSeo
				defaultTitle="Clari's Clouds"
				titleTemplate="%s – Clari's Clouds"
				additionalLinkTags={[
					{
						href: `/api/image/${
							strippedFavicon.formats.thumbnail.hash +
							strippedFavicon.formats.thumbnail.ext
						}`,
						rel: "icon",
					},
				]}
			/>
			<Component {...pageProps} />
		</>
	);
}

export default CustomApp;
