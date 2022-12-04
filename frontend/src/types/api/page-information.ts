import { GraphQL, ImageSchema } from "types/api/strapi";

type PageInformationSchema = {
	favicon: GraphQL.Data<ImageSchema>;
	links: Array<{
		label: string;
		path: string;
	}>;
	logo: GraphQL.Data<ImageSchema>;
};

export default PageInformationSchema;
