import {
	ApolloClient,
	ApolloClientOptions,
	InMemoryCache,
	NormalizedCacheObject,
	QueryOptions,
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
		const { data, error, errors } = await resolver.query<
			GraphQL.Response<DataName, ReturnType>,
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

export default request;
