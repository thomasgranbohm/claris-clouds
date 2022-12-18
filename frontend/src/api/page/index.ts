import request from "api/index";

import GetAllPageSlugs from "queries/GetAllPageSlugs.gql";
import GetPageBySlug from "queries/GetPageBySlug.gql";

import { PageSchema } from "types/api/page";

export const getPage = async (slug: string) => {
	return request<"page", PageSchema>({
		query: GetPageBySlug,
		variables: { slug },
	});
};

export const getPageSlugs = async () => {
	return request<"pages", Pick<PageSchema, "slug">[]>({
		query: GetAllPageSlugs,
	});
};
