import { requestStrapi } from "api/index";

import GetAllPageSlugs from "queries/GetAllPageSlugs.gql";
import GetPageBySlug from "queries/GetPageBySlug.gql";

import { PageSchema } from "types/api/page";
import { GraphQL } from "types/api/strapi";

export const getPage = async (slug: string) => {
	return requestStrapi<{ page: GraphQL.Data<PageSchema> }>({
		query: GetPageBySlug,
		variables: { slug },
	});
};

export const getPageSlugs = async () => {
	return requestStrapi<{ pages: GraphQL.Data<Pick<PageSchema, "slug">[]> }>({
		query: GetAllPageSlugs,
	});
};
