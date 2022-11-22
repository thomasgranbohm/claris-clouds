import {
	GetStaticProps,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from "next";

import { getPageInformation } from "api/page-information";

import { LayoutSchema } from "types/components";

function getLayoutData<T extends { [key: string]: any }>(
	f: GetStaticProps<T>
): GetStaticProps<T & LayoutSchema> {
	return async (context: GetStaticPropsContext) => {
		const { data, error } = await getPageInformation();

		if (error) {
			if (error.status === 404) {
				return {
					notFound: true,
				};
			} else {
				throw error;
			}
		}

		const res: GetStaticPropsResult<T> = await f(context);

		if ("notFound" in res || "redirect" in res) {
			return res;
		}

		return {
			props: {
				...res.props,
				layout: data.attributes,
			} as T & LayoutSchema,
			revalidate: 60 * 60 * 1000,
		};
	};
}

export default getLayoutData;
