import { ImageSchema, Response } from "types/api/strapi";
import AllSections from "types/sections";

export interface StartPage {
	background: Response<ImageSchema>;
	sections: AllSections[];
	title: string;
}
