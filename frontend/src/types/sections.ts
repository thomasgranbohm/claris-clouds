import Artwork from "types/api/artwork";
import Components from "types/api/components";
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
	link?: Components.Link;
	text: string;
	title?: string;
}

export interface ShowcaseSchema {
	__typename: "ComponentSectionsShowcase";
	images: GraphQL.Data<ImageSchema[]>;
}

type AllSections =
	| ArtworkDisplaySchema
	| CallToActionSchema
	| RichTextSchema
	| ShowcaseSchema;

export default AllSections;
