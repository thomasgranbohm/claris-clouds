import request from "api";

import Artwork from "types/api/artwork";

export const getArtwork = (slug: string) => {
	return request<Artwork>("GET", `artworks/${slug}`);
};

export const getArtworks = async () => {
	return request<Array<Artwork>>("GET", `artworks/`);
};
