import { GraphQL, ImageSchema, SEOSchema } from "types/api/strapi";
import AllSections from "types/sections";

export interface StartPage {
	background: GraphQL.Data<ImageSchema>;
	foreground: GraphQL.Data<ImageSchema>;
	sections: AllSections[];
	seo?: SEOSchema;
	title: string;
}
