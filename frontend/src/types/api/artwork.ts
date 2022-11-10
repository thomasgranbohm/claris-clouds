import { ImageSchema, Response } from "./strapi";

interface Artwork {
	description?: string;
	image: Response<ImageSchema>;
	name: string;
	original_sold: boolean;
	redbubble_link: string;
	slug: string;
}

export default Artwork;
