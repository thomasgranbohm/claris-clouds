import AllSections from "types/sections";

import { GraphQL, ImageSchema } from "./strapi";

interface ArtworkSchema {
	description?: string;
	external_link: string;
	height: number;
	image: GraphQL.Data<ImageSchema>;
	medium: string;
	name: string;
	original_sold: boolean;
	slug: string;
	width: number;
	year_of_creation: number;
}

export interface ArtworkPageSchema extends ArtworkSchema {
	sections: AllSections[];
}

export default ArtworkSchema;
