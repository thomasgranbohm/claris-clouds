import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import MetadataSchema from "types/api/metadata";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

import "../styles/globals.scss";

function CustomApp({
	Component,
	pageProps,
}: AppProps<{ meta: MetadataSchema }>) {
	const { meta } = pageProps;
	const { description, favicon, page_prefix, title } = meta;

	return (
		<>
			<DefaultSeo
				defaultTitle={title}
				titleTemplate={page_prefix || title}
				description={description}
				additionalLinkTags={[
					{ href: getImageLink(stripWrapper(favicon)), rel: "icon" },
				]}
				openGraph={{ description, title, type: "website" }}
			/>
			<Component {...pageProps} />
		</>
	);
}

export default CustomApp;
