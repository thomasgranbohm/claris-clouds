import request from "api";

import GetArtworkBySlug from "queries/GetArtworkBySlug.gql";
import GetArtworks from "queries/GetArtworks.gql";

import Artwork from "types/api/artwork";

export const getArtwork = async (slug: string) => {
	return request<"artwork", Artwork>({
		query: GetArtworkBySlug,
		variables: { slug },
	});
};

export const getArtworks = async () => {
	return request<"artworks", Artwork[]>({
		query: GetArtworks,
	});
};
