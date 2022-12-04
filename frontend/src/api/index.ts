import {
	ApolloClient,
	ApolloClientOptions,
	ApolloError,
	InMemoryCache,
	NormalizedCacheObject,
	QueryOptions,
	ServerError,
} from "@apollo/client";
import getConfig from "next/config";

import { GraphQL } from "types/api/strapi";

const { serverRuntimeConfig } = getConfig();

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

const request = async <
	DataName extends string,
	ReturnType,
	TVariables = Record<string, any>
>(
	options: QueryOptions<TVariables, ReturnType>
): Promise<GraphQL.Wrapper<DataName, ReturnType>> => {
	const resolver = serverRuntimeConfig.API_URL ? internalAPI : undefined;

	if (!resolver) {
		throw new Error("Not implemented.");
	}

	try {
		const { data, error } = await resolver.query<
			GraphQL.Response<DataName, ReturnType>,
			TVariables
		>(options);

		if (error) {
			throw error;
		}

		if (!data) {
			throw new Error("Data is undefined.");
		}

		return { data };
	} catch (error) {
		if (error) {
			if (error instanceof ApolloError) {
				if (
					error.networkError &&
					(error.networkError as ServerError).statusCode
				) {
					return {
						data: null as any,
						error: error.networkError as ServerError,
					};
				}
			}
		}

		throw error;
	}
};

export default request;
