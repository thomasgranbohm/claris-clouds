import { SSRProvider } from "react-aria";
import type { AppProps } from "next/app";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import FocusRing from "components/aria/FocusRing";
import CookieConsent from "components/CookieConsent";

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
	const { layout, meta } = pageProps;
	const { description, favicon, page_prefix, title } = meta;

	return (
		<SSRProvider>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<CookieConsent text={layout.cookie_consent_text} />
			<DefaultSeo
				defaultTitle={title}
				titleTemplate={page_prefix || title}
				description={description}
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
				openGraph={{ description, title, type: "website" }}
				canonical={publicRuntimeConfig.PAGE_URL + router.asPath}
			/>
			<FocusRing>
				<a href="#main-content" className="skip-link">
					Skip to main content
				</a>
			</FocusRing>
			<Component {...pageProps} />
		</SSRProvider>
	);
}

export default CustomApp;
