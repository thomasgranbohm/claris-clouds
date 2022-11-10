import { ImageSchema, Response } from "types/api/strapi";

export interface StartPage {
	background: Response<ImageSchema>;
	title: string;
}
