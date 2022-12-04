import { internalAPI } from "api/index";

import GetStartpage from "queries/GetStartPage.gql";

import { StartPageRequest } from "types/requests";

export const getStartPage = async () => {
	return internalAPI.query<StartPageRequest>({ query: GetStartpage });
};
