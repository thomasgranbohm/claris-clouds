import Artwork from "types/api/artwork";
import { GraphQL } from "types/api/strapi";

export interface ArtworkDisplaySchema {
	__typename: "ComponentSectionsArtworkDisplay";
	artworks: GraphQL.Data<Artwork[]>;
	title?: string;
}

type AllSections = ArtworkDisplaySchema;

export default AllSections;
