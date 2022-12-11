import { GraphQL, ImageSchema } from "./strapi";

interface Artwork {
	description?: string;
	height: number;
	image: GraphQL.Data<ImageSchema>;
	medium: string;
	name: string;
	original_sold: boolean;
	redbubble_link: string;
	slug: string;
	width: number;
	year_of_creation: number;
}

export default Artwork;
