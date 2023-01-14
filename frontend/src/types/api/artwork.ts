import AllSections from "types/sections";

import { GraphQL, ImageSchema } from "./strapi";

interface ArtworkSchema {
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

export interface ArtworkPageSchema extends ArtworkSchema {
	sections: AllSections[];
}

export default ArtworkSchema;
