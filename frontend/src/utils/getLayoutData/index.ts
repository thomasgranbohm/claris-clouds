import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	GetStaticProps,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from "next";

import request from "api/index";

import GetGeneralInformation from "queries/GetGeneralInformation.gql";

import MetadataSchema from "types/api/metadata";
import PageInformationSchema from "types/api/page-information";
import { GraphQL } from "types/api/strapi";
import { LayoutSchema } from "types/components";

import stripWrapper from "utils/stripWrapper";

export function getLayoutDataSSR<T extends { [key: string]: any }>(
	f?: GetServerSideProps<T>
): GetServerSideProps<T & LayoutSchema & { meta: MetadataSchema }> {
	return async (context: GetServerSidePropsContext) => {
		const { data, error } = await request<{
			meta: GraphQL.Data<MetadataSchema>;
			pageInformation: GraphQL.Data<PageInformationSchema>;
		}>({
			query: GetGeneralInformation,
		});

		if (error) {
			if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
				return {
					notFound: true,
				};
			} else {
				throw error;
			}
		}

		if (!f) {
			return {
				props: {
					layout: stripWrapper(data.pageInformation),
					meta: stripWrapper(data.meta),
				} as T & LayoutSchema & { meta: MetadataSchema },
			};
		}

		const res: GetServerSidePropsResult<T> = await f(context);

		if ("notFound" in res || "redirect" in res) {
			return res;
		}

		return {
			props: {
				...res.props,
				layout: stripWrapper(data.pageInformation),
				meta: stripWrapper(data.meta),
			} as T & LayoutSchema & { meta: MetadataSchema },
		};
	};
}

export function getLayoutDataSSG<T extends { [key: string]: any }>(
	f?: GetStaticProps<T>
): GetStaticProps<T & LayoutSchema & { meta: MetadataSchema }> {
	// TODO: needs some cleanup
	return async (context: GetStaticPropsContext) => {
		const { data, error } = await request<{
			meta: GraphQL.Data<MetadataSchema>;
			pageInformation: GraphQL.Data<PageInformationSchema>;
		}>({
			query: GetGeneralInformation,
		});

		if (error) {
			if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
				return {
					notFound: true,
				};
			} else {
				throw error;
			}
		}

		if (!f) {
			return {
				props: {
					layout: stripWrapper(data.pageInformation),
					meta: stripWrapper(data.meta),
				} as T & LayoutSchema & { meta: MetadataSchema },
				revalidate: 60,
			};
		}

		const res: GetStaticPropsResult<T> = await f(context);

		if ("notFound" in res || "redirect" in res) {
			return res;
		}

		return {
			revalidate: 60,
			...res,
			props: {
				...res.props,
				layout: stripWrapper(data.pageInformation),
				meta: stripWrapper(data.meta),
			} as T & LayoutSchema & { meta: MetadataSchema },
		};
	};
}
