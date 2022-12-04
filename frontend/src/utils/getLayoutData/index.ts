import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next";

import { getPageInformation } from "api/page-information";

import { LayoutSchema } from "types/components";

import stripWrapper from "utils/stripWrapper";

function getLayoutData<T extends { [key: string]: any }>(
	f: GetServerSideProps<T>
): GetServerSideProps<T & LayoutSchema> {
	return async (context: GetServerSidePropsContext) => {
		const { data, error } = await getPageInformation();

		if (error) {
			if (error.statusCode === 404) {
				return {
					notFound: true,
				};
			} else {
				throw error;
			}
		}

		const res: GetServerSidePropsResult<T> = await f(context);

		if ("notFound" in res || "redirect" in res) {
			return res;
		}

		return {
			props: {
				...res.props,
				layout: stripWrapper(data.pageInformation),
			} as T & LayoutSchema,
		};
	};
}

export default getLayoutData;
