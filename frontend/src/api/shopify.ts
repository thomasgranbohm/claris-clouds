import { createStorefrontClient } from "@shopify/hydrogen-react";
import getConfig from "next/config";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const client = createStorefrontClient({
	privateStorefrontToken: serverRuntimeConfig.SHOPIFY_STOREFRONT_TOKEN,
	publicStorefrontToken: publicRuntimeConfig.SHOPIFY_STOREFRONT_TOKEN,
	storeDomain: serverRuntimeConfig.SHOPIFY_STORE_DOMAIN,
	storefrontApiVersion: serverRuntimeConfig.SHOPIFY_API_VERSION,
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPrivateTokenHeaders = client.getPrivateTokenHeaders;
export const getPublicTokenHeaders = client.getPublicTokenHeaders;
