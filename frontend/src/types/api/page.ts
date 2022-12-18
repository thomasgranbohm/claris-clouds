import { GraphQL, ImageSchema } from "types/api/strapi";
import AllSections from "types/sections";

export interface PageSchema {
	accessibility?: {
		description?: string;
		image: GraphQL.Data<ImageSchema>;
		title?: string;
	};
	sections: AllSections[];
	slug: string;
	title: string;
}
