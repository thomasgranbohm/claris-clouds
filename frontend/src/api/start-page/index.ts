import { requestStrapi } from "api/index";

import GetStartpage from "queries/GetStartPage.gql";

import { StartPage } from "types/api/start-page";
import { GraphQL } from "types/api/strapi";

export const getStartPage = async () => {
	return requestStrapi<{ startPage: GraphQL.Data<StartPage> }>({
		query: GetStartpage,
	});
};
