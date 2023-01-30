import { GraphQL, ImageSchema } from "types/api/strapi";

type MetaTag = { content: string; name?: string; property?: string };

type MetadataSchema = {
	favicon: GraphQL.Data<ImageSchema>;
	metatags?: MetaTag[];
	page_prefix: string;
};

export default MetadataSchema;
