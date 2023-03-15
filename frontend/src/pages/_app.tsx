import { useEffect } from "react";
import { SSRProvider } from "react-aria";
import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";
import { print } from "graphql";
import type { AppProps } from "next/app";
import getConfig from "next/config";
import { Nunito } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { MetaTag } from "next-seo/lib/types";
import ProgressBar from "nextjs-progressbar";

import FocusRing from "components/FocusRing";

import LayoutContext, { LayoutContextSchema } from "contexts/LayoutContext";

import CartFragment from "queries/fragments/Cart.fragment.gql";

import variables from "styles/exports.module.scss";

import "../styles/globals.scss";

const { publicRuntimeConfig } = getConfig();

const nunito = Nunito({
	style: ["normal", "italic"],
	subsets: ["latin"],
	weight: ["400", "700"],
});

function CustomApp({ Component, pageProps }: AppProps<LayoutContextSchema>) {
	const router = useRouter();
	const { campaign, country, layout } = pageProps;

	if (layout === null) {
		throw new Error("Missing needed layout data data");
	}

	const { metatags, page_prefix } = layout;

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
			<ShopifyProvider
				storeDomain={publicRuntimeConfig.SHOPIFY_STORE_DOMAIN}
				countryIsoCode={country || "FR"}
				languageIsoCode="EN"
				storefrontApiVersion={publicRuntimeConfig.SHOPIFY_API_VERSION}
				storefrontToken={publicRuntimeConfig.SHOPIFY_STOREFRONT_TOKEN}
			>
				<CartProvider
					cartFragment={print(CartFragment)}
					countryCode={country || "FR"}
				>
					<Head>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1.0"
						/>
					</Head>
					<DefaultSeo
						titleTemplate={page_prefix}
						canonical={publicRuntimeConfig.PAGE_URL + router.asPath}
						additionalMetaTags={
							metatags
								? (metatags.map(
										({ content, name, property }) => ({
											content,
											name,
											property,
										})
								  ) as MetaTag[])
								: []
						}
					/>
					<div className={nunito.className}>
						<FocusRing>
							<a href="#main-content" className="skip-link">
								Skip to main content
							</a>
						</FocusRing>
						<ProgressBar
							color={variables.color_accent}
							nonce="claris-clouds-progress-bar"
							options={{
								easing: "ease",
								showSpinner: false,
								speed: 500,
							}}
						/>
						<LayoutContext.Provider
							value={{ campaign, country, layout }}
						>
							<Component {...pageProps} />
						</LayoutContext.Provider>
					</div>
				</CartProvider>
			</ShopifyProvider>
		</SSRProvider>
	);
}

export default CustomApp;
