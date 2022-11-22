import request from "api/index";

import { PageSchema } from "types/api/page";

export const getPage = async (slug: string) => {
	return request<PageSchema>("GET", `pages/${slug}`);
};

export const getPages = async () => {
	return request<PageSchema[]>("GET", "pages/");
};
