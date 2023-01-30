import { SEOSchema } from "types/api/strapi";
import AllSections from "types/sections";

export interface PageSchema {
	sections: AllSections[];
	seo?: SEOSchema;
	slug: string;
	title: string;
}
