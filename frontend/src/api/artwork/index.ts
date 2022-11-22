import request from "api";

import Artwork from "types/api/artwork";

export const getArtwork = (slug: string, data: any = {}) => {
	return request<Artwork>("GET", `artworks/${slug}`, data);
};

export const getArtworks = async (data: any = {}) => {
	return request<Array<Artwork>>("GET", `artworks/`, data);
};
