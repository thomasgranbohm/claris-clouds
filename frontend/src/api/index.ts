import {
	ApolloClient,
	ApolloClientOptions,
	InMemoryCache,
	NormalizedCacheObject,
	QueryOptions,
} from "@apollo/client";
import axios, { AxiosResponse } from "axios";
import { ASTNode, print } from "graphql";
import getConfig from "next/config";

import { getPrivateTokenHeaders, getStorefrontApiUrl } from "api/shopify";

import { GraphQL } from "types/api/strapi";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const defaults = {
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			errorPolicy: "all",
			fetchPolicy: "no-cache",
		},
		watchQuery: {
			errorPolicy: "ignore",
			fetchPolicy: "no-cache",
		},
	},
} as ApolloClientOptions<NormalizedCacheObject>;

export const internalAPI = new ApolloClient({
	...defaults,
	uri: serverRuntimeConfig.API_URL + "/graphql",
});

export const externalAPI = new ApolloClient({
	...defaults,
	...(publicRuntimeConfig.HTTP_AUTH
		? {
				headers: {
					Authorization: publicRuntimeConfig.HTTP_AUTH,
				},
		  }
		: {}),
	uri: publicRuntimeConfig.API_URL + "/graphql",
});

export const requestStrapi = async <
	ReturnType,
	TVariables = Record<string, any>
>(
	options: QueryOptions<TVariables>
): Promise<GraphQL.Wrapper<ReturnType>> => {
	const resolver =
		process.env.NODE_ENV !== "production" && serverRuntimeConfig.API_URL
			? internalAPI
			: externalAPI;

	try {
		const { data, error, errors } = await resolver.query<
			ReturnType,
			TVariables
		>(options);

		// Apollo Errors
		if (error) {
			throw error;
		}

		// GraphQL Errors
		if (errors && errors.length > 0) {
			const graphQLError = errors.slice().pop() as unknown;
			return {
				data: null as any,
				error: graphQLError as GraphQL.Error,
			};
		}

		if (!data) {
			throw new Error("Data is undefined.");
		}

		return { data };
	} catch (error) {
		// TODO: better error handling

		console.error("Throwing...");
		throw error;
	}
};

export const requestShopify = async <Response, Request = Record<string, any>>(
	query: ASTNode,
	variables?: Request & { country_code?: string }
): Promise<AxiosResponse<{ data: Response }>> => {
	const resp = await axios.post<
		Request & { country_code?: string },
		AxiosResponse<{ data: Response }>
	>(
		getStorefrontApiUrl(),
		{
			query: print(query),
			variables,
		},
		{
			headers: getPrivateTokenHeaders({
				contentType: "json",
			}),
		}
	);

	return resp;
};
