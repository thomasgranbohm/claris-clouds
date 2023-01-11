import request from "api/index";

import GetMetadata from "queries/GetMetadata.gql";

import MetadataSchema from "types/api/metadata";
import { GraphQL } from "types/api/strapi";

export const getMetadata = async () => {
	return request<{ meta: GraphQL.Data<MetadataSchema> }>({
		query: GetMetadata,
	});
};
