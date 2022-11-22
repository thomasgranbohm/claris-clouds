import request from "api/index";

import PageInformationSchema from "types/api/page-information";

export const getPageInformation = async () => {
	return request<PageInformationSchema>("GET", "page-information");
};
