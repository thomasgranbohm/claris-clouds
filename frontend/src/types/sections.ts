import Artwork from "types/api/artwork";
import { GraphQL, ImageSchema } from "types/api/strapi";

export interface ArtworkDisplaySchema {
	__typename: "ComponentSectionsArtworkDisplay";
	artworks: GraphQL.Data<Artwork[]>;
	title?: string;
}

export interface RichTextSchema {
	__typename: "ComponentSectionsRichText";
	text: string;
}

export interface CallToActionSchema {
	__typename: "ComponentSectionsCallToAction";
	image: GraphQL.Data<ImageSchema>;
	link?: {
		label: string;
		path: string;
	};
	text: string;
	title?: string;
}

type AllSections = ArtworkDisplaySchema | CallToActionSchema | RichTextSchema;

export default AllSections;