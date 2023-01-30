import { AccessibilitySchema } from "types/api/strapi";
import AllSections from "types/sections";

export interface PageSchema {
	accessibility?: AccessibilitySchema;
	sections: AllSections[];
	slug: string;
	title: string;
}
