import type { AppProps } from "next/app";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import FocusRing from "components/aria/FocusRing";

import MetadataSchema from "types/api/metadata";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

import "../styles/globals.scss";

const { publicRuntimeConfig } = getConfig();

function CustomApp({
	Component,
	pageProps,
}: AppProps<{ meta: MetadataSchema }>) {
	const router = useRouter();
	const { meta } = pageProps;
	const { description, favicon, page_prefix, title } = meta;

	return (
		<>
			<DefaultSeo
				defaultTitle={title}
				titleTemplate={page_prefix || title}
				description={description}
				additionalLinkTags={[
					{
						href: favicon && getImageLink(stripWrapper(favicon)),
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
		</>
	);
}

export default CustomApp;
