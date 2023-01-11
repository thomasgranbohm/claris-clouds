import request from "api/index";

import GetAllPageSlugs from "queries/GetAllPageSlugs.gql";
import GetPageBySlug from "queries/GetPageBySlug.gql";

import { PageSchema } from "types/api/page";
import { GraphQL } from "types/api/strapi";

export const getPage = async (slug: string) => {
	return request<{ page: GraphQL.Data<PageSchema> }>({
		query: GetPageBySlug,
		variables: { slug },
	});
};

export const getPageSlugs = async () => {
	return request<{ pages: GraphQL.Data<Pick<PageSchema, "slug">[]> }>({
		query: GetAllPageSlugs,
	});
};
