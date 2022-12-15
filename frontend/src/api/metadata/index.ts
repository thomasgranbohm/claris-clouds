import request from "api/index";

import GetMetadata from "queries/GetMetadata.gql";

import MetadataSchema from "types/api/metadata";

export const getMetadata = async () => {
	return request<"meta", MetadataSchema>({
		query: GetMetadata,
	});
};
