import { requestShopify } from "api/index";

import GetProductHandlesQuery from "queries/shopify/GetProductHandles.gql";
import GetProductPreviewsQuery from "queries/shopify/GetProductPreviews.gql";

import { Requests, Responses } from "types/api/shopify";

export const getProductHandles = async (country_code?: string) => {
	return requestShopify<Responses.GetProductHandles>(GetProductHandlesQuery, {
		country_code,
	});
};

export const getProductPreviews = async (country_code?: string) => {
	return requestShopify<Responses.GetProductPreviews>(
		GetProductPreviewsQuery,
		{ country_code }
	);
};

export const getProductByHandle = async (
	handle: string,
	country_code?: string
) => {
	return requestShopify<Responses.GetProduct, Requests.GetProduct>(
		GetProductPreviewsQuery,
		{ country_code, handle }
	);
};
