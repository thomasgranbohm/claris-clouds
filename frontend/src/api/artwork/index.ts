import request from "api";

import GetAllArtworkSlugs from "queries/GetAllArtworkSlugs.gql";
import GetArtworkBySlug from "queries/GetArtworkBySlug.gql";
import GetArtworksQuery from "queries/GetArtworks.gql";

import Artwork, { ArtworkPageSchema } from "types/api/artwork";
import { GraphQL } from "types/api/strapi";

export const getArtwork = async (slug: string) => {
	return request<{
		artwork: GraphQL.Data<ArtworkPageSchema>;
		artworks: GraphQL.Data<Pick<Artwork, "name" | "slug" | "image">[]>;
	}>({
		query: GetArtworkBySlug,
		variables: { slug },
	});
};

export const getArtworks = async (start: number = 0) => {
	return request<{ artworks: GraphQL.Data<Artwork[]> }>({
		query: GetArtworksQuery,
		variables: { start: start },
	});
};

export const getArtworkSlugs = async () => {
	return request<{ artworks: GraphQL.Data<Pick<Artwork, "slug">[]> }>({
		query: GetAllArtworkSlugs,
	});
};
