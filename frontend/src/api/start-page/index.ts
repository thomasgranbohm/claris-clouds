import request from "api/index";

import GetStartpage from "queries/GetStartPage.gql";

import { StartPage } from "types/api/start-page";

export const getStartPage = async () => {
	return request<"startPage", StartPage>({ query: GetStartpage });
};
