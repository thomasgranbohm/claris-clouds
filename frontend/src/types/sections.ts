import Artwork from "types/api/artwork";
import Components from "types/api/components";
import { GraphQL, ImageSchema } from "types/api/strapi";

export interface ArtworkDisplaySchema {
	__typename: "ComponentSectionsArtworkDisplay";
	artworks: GraphQL.Data<Artwork[]>;
	title?: string;
}

export interface CallToActionSchema {
	__typename: "ComponentSectionsCallToAction";
	cta_picture_alignment: "left" | "right";
	image: GraphQL.Data<ImageSchema>;
	link?: Components.Link;
	text: string;
	title?: string;
}

export interface RichTextSchema {
	__typename: "ComponentSectionsRichText";
	text: string;
}

export interface ShowcaseSchema {
	__typename: "ComponentSectionsShowcase";
	images: GraphQL.Data<ImageSchema[]>;
}

export interface TextWithPictureSchema {
	__typename: "ComponentSectionsTextWithPicture";
	image: GraphQL.Data<ImageSchema>;
	text: string;
	twp_picture_alignment: "left" | "right";
}

type AllSections =
	| ArtworkDisplaySchema
	| CallToActionSchema
	| RichTextSchema
	| ShowcaseSchema
	| TextWithPictureSchema;

export default AllSections;
