import { Image, Response } from "types/api/strapi";

export interface StartPage {
	background: Response<Image>;
	title: string;
}
