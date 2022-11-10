export type Response<T> = {
	data: T extends Array<any>
		? Array<{
				attributes: T[0];
				id: number;
		  }>
		: {
				attributes: T;
				id: number;
		  };
	error?: ResponseError;
	meta: T extends Array<any>
		? {
				pagination: T extends Array<any> ? PaginationSchema : undefined;
		  }
		: undefined;
};

export type ResponseError = {
	details: object;
	message: string;
	name: string;
	status: 404;
};

export type PaginationSchema = {
	page: number;
	pageCount: number;
	pageSize: number;
	total: number;
};

export type ImageFormat = {
	ext: string;
	hash: string;
	height: number;
	mime: string;
	name: string;
	path?: any;
	size: number;
	url: string;
	width: number;
};

export type ImageFormatNames = "thumbnail" | "small" | "medium" | "large";

export type ImageFormats = {
	[formatName in ImageFormatNames]: ImageFormat;
};

export interface ImageSchema extends Dates {
	alternativeText: string;
	caption: string;
	ext: string;
	formats: ImageFormats;
	hash: string;
	height: number;
	mime: string;
	name: string;
	previewUrl?: any;
	provider: string;
	provider_metadata?: any;
	size: number;
	url: string;
	width: number;
}

export interface Dates {
	createdAt: Date;
	publishedAt?: Date;
	updatedAt: Date;
}
