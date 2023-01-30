export namespace GraphQL {
	export type Data<ResponseData> = {
		data: ResponseData extends Array<unknown>
			? Array<{
					attributes: ResponseData[0];
					id: number;
			  }>
			: {
					attributes: ResponseData;
					id: number;
			  };

		meta: ResponseData extends Array<unknown>
			? {
					pagination: ResponseData extends Array<unknown>
						? PaginationSchema
						: undefined;
			  }
			: undefined;
	};

	export interface Error {
		extensions: {
			code: "STRAPI_NOT_FOUND_ERROR";
			error: {
				details: object;
				message: string;
				name: string;
			};
		};
		message: string;
	}

	export type Wrapper<ResponseData> = {
		data: ResponseData;
		error?: Error;
	};
}

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

export type ImageFormatNames =
	| "base64"
	| "thumbnail"
	| "small"
	| "medium"
	| "large";

export type ImageFormats = {
	[formatName in ImageFormatNames]?: ImageFormat;
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

export interface SEOSchema {
	description?: string;
	image?: GraphQL.Data<ImageSchema>;
	title?: string;
}
