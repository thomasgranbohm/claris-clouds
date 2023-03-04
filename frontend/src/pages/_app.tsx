import { useEffect } from "react";
import { SSRProvider } from "react-aria";
import { CartContextProvider } from "contexts/CartContext";
import type { AppProps } from "next/app";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { MetaTag } from "next-seo/lib/types";
import ProgressBar from "nextjs-progressbar";

import FocusRing from "components/FocusRing";

import variables from "styles/exports.module.scss";

import MetadataSchema from "types/api/metadata";
import PageInformationSchema from "types/api/page-information";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

import "../styles/globals.scss";

const { publicRuntimeConfig } = getConfig();

function CustomApp({
	Component,
	pageProps,
}: AppProps<{ layout: PageInformationSchema; meta: MetadataSchema }>) {
	const router = useRouter();
	const { meta } = pageProps;
	const { favicon, metatags, page_prefix } = meta;

	// Install service-worker
	useEffect(() => {
		if (
			"serviceWorker" in navigator &&
			process.env.NODE_ENV === "production"
		) {
			navigator.serviceWorker
				.register("/service-worker.js")
				.catch((error) =>
					console.log("Registration failed with " + error)
				);
		}
	}, []);

	return (
		<SSRProvider>
			<CartContextProvider>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
				</Head>
				<DefaultSeo
					titleTemplate={page_prefix}
					additionalLinkTags={[
						{
							href:
								favicon &&
								`/_next/image?url=${getImageLink(
									stripWrapper(favicon)
								)}&w=128&q=75`,
							rel: "icon",
						},
					]}
					additionalMetaTags={
						metatags
							? (metatags.map(({ content, name, property }) => ({
									content,
									name,
									property,
							  })) as MetaTag[])
							: []
					}
					canonical={publicRuntimeConfig.PAGE_URL + router.asPath}
				/>
				<FocusRing>
					<a href="#main-content" className="skip-link">
						Skip to main content
					</a>
				</FocusRing>
				<ProgressBar
					color={variables.color_accent}
					nonce="claris-clouds-progress-bar"
					options={{ easing: "ease", showSpinner: false, speed: 500 }}
				/>
				<Component {...pageProps} />
			</CartContextProvider>
		</SSRProvider>
	);
}

export default CustomApp;
