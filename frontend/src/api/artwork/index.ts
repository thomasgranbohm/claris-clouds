import request from "api";

import GetArtworkBySlug from "queries/GetArtworkBySlug.gql";
import GetGallery from "queries/GetGallery.gql";

import Artwork from "types/api/artwork";

export const getArtwork = async (slug: string) => {
	return request<"artwork", Artwork>({
		query: GetArtworkBySlug,
		variables: { slug },
	});
};

export const getGallery = async () => {
	return request<"artworks", Artwork[]>({
		query: GetGallery,
	});
};
