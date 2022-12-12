import Components from "types/api/components";
import { GraphQL, ImageSchema } from "types/api/strapi";

type PageInformationSchema = {
	favicon: GraphQL.Data<ImageSchema>;
	links?: Components.Link[];
	logo: GraphQL.Data<ImageSchema>;
	socials?: Components.Social[];
};

export default PageInformationSchema;
