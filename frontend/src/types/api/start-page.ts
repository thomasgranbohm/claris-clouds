import { AccessibilitySchema, GraphQL, ImageSchema } from "types/api/strapi";
import AllSections from "types/sections";

export interface StartPage {
	accessibility?: AccessibilitySchema;
	background: GraphQL.Data<ImageSchema>;
	foreground: GraphQL.Data<ImageSchema>;
	sections: AllSections[];
	title: string;
}
