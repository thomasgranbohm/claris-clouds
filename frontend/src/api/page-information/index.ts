import request from "api/index";

import GetPageInformation from "queries/GetPageInformation.gql";

import PageInformationSchema from "types/api/page-information";

export const getPageInformation = async () => {
	return request<"pageInformation", PageInformationSchema>({
		query: GetPageInformation,
	});
};
