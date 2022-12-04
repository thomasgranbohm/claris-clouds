import { GraphQL, ImageSchema } from "./strapi";

interface Artwork {
	description?: string;
	image: GraphQL.Data<ImageSchema>;
	name: string;
	original_sold: boolean;
	redbubble_link: string;
	slug: string;
}

export default Artwork;
