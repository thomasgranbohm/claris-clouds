import request from "api";

import GetAllArtworkSlugs from "queries/GetAllArtworkSlugs.gql";
import GetArtworkBySlug from "queries/GetArtworkBySlug.gql";
import GetArtworksQuery from "queries/GetArtworks.gql";

import Artwork, { ArtworkPageSchema } from "types/api/artwork";

export const getArtwork = async (slug: string) => {
	return request<"artwork", ArtworkPageSchema>({
		query: GetArtworkBySlug,
		variables: { slug },
	});
};

export const getArtworks = async () => {
	return request<"artworks", Artwork[]>({
		query: GetArtworksQuery,
	});
};

export const getArtworkSlugs = async () => {
	return request<"artworks", Pick<Artwork, "slug">[]>({
		query: GetAllArtworkSlugs,
	});
};
