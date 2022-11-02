import request from "api/index";

import { StartPage } from "types/api/start-page";

export const getStartPage = async () => {
	return request<StartPage>("GET", "start-page");
};
