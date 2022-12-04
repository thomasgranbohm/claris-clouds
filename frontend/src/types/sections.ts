import Artwork from "types/api/artwork";
import { Response } from "types/api/strapi";

export interface ArtworkDisplaySchema {
	__typename: "ComponentSectionsArtworkDisplay";
	artworks: Response<Array<Artwork>>;
	title?: string;
}

type AllSections = ArtworkDisplaySchema;

export default AllSections;
