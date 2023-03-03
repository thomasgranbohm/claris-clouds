import axios from "axios";
import { DocumentNode, print } from "graphql";
import getConfig from "next/config";

import { Shopify } from "types/api/shopify";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const client = axios.create({
	headers: {
		"Content-Type": "application/json",
		"X-Shopify-Storefront-Access-Token":
			publicRuntimeConfig.SHOPIFY_HEADLESS_TOKEN,
	},
});

const requestShopify = async <T extends any | null>(
	query: DocumentNode,
	variables?: object
): Promise<Shopify.Response<T>> => {
	try {
		const { data } = await client.post(
			serverRuntimeConfig.SHOPIFY_URL,
			{ query: print(query), variables },
			{
				method: "POST",
			}
		);

		return data;
	} catch (error) {
		console.error("Error:", error);

		return {
			data: null as any,
			error: error,
		};
	}
};

export default requestShopify;
