import request from "api/index";

import { PageSchema } from "types/api/page";

export const getPage = async (slug: string) => {
	throw new Error("Not implemented");
	// return request<PageSchema, "page">("GET", `pages/${slug}`);
};

export const getPages = async () => {
	throw new Error("Not implemented");
	// return request<PageSchema[]>("GET", "pages/");
};
