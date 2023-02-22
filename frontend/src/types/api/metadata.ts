type MetaTag = { content: string; name?: string; property?: string };

type MetadataSchema = {
	metatags?: MetaTag[];
	page_prefix: string;
};

export default MetadataSchema;
