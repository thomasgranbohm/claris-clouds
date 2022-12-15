import { GraphQL, ImageSchema } from "types/api/strapi";

type MetadataSchema = {
	description?: string;
	favicon: GraphQL.Data<ImageSchema>;
	page_prefix?: string;
	title: string;
};

export default MetadataSchema;
