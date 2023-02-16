import axios from "axios";
import { DocumentNode, print } from "graphql";
import getConfig from "next/config";

import { Shopify } from "types/api/shopify";

const { serverRuntimeConfig } = getConfig();

const client = axios.create({
	headers: {
		"Content-Type": "application/json",
		"X-Shopify-Access-Token": serverRuntimeConfig.SHOPIFY_ACCESS_TOKEN,
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

type Product = {
	description: string;
	title: string;
};

export default requestShopify;
