import { ImageSchema, Response } from "types/api/strapi";

type PageInformationSchema = {
	favicon: Response<ImageSchema>;
	links: Array<{
		label: string;
		path: string;
	}>;
	logo: Response<ImageSchema>;
};

export default PageInformationSchema;
