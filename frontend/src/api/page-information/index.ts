import request from "api/index";

import GetPageInformation from "queries/GetPageInformation.gql";

import PageInformationSchema from "types/api/page-information";
import { GraphQL } from "types/api/strapi";

export const getPageInformation = async () => {
	return request<{ pageInformation: GraphQL.Data<PageInformationSchema> }>({
		query: GetPageInformation,
	});
};
