import { GraphQL, ImageSchema } from "types/api/strapi";
import AllSections from "types/sections";

export interface StartPage {
	background: GraphQL.Data<ImageSchema>;
	foreground: GraphQL.Data<ImageSchema>;
	sections: AllSections[];
	title: string;
}
