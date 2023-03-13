import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetStaticProps,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from "next";

import request from "api/index";

import { LayoutContextSchema } from "contexts/LayoutContext";

import GetGeneralInformation from "queries/GetGeneralInformation.gql";

import CampaignSchema from "types/api/campaign";
import MetadataSchema from "types/api/metadata";
import PageInformationSchema from "types/api/page-information";
import { GraphQL } from "types/api/strapi";

import stripWrapper from "utils/stripWrapper";

type RequestType = {
	campaign: GraphQL.Data<CampaignSchema>;
	meta: GraphQL.Data<MetadataSchema>;
	pageInformation: GraphQL.Data<PageInformationSchema>;
};

export function getLayoutDataSSR<T extends { [key: string]: any }>(
	f?: GetServerSideProps<T>
): GetServerSideProps<T & LayoutContextSchema> {
	return async (context: GetServerSidePropsContext) => {
		const { data, error } = await request<RequestType>({
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

		const country = context.req.headers["cf-ipcountry"];

		if (!f) {
			return {
				props: {
					campaign:
						data.campaign.data !== null
							? stripWrapper(data.campaign)
							: null,
					country: !!country ? country.toString() : null,
					layout: stripWrapper(data.pageInformation),
					meta: stripWrapper(data.meta),
				} as T & LayoutContextSchema,
			};
		}

		const res = await f(context);

		if ("notFound" in res || "redirect" in res) {
			return res;
		}

		return {
			props: {
				...res.props,
				campaign:
					data.campaign.data !== null
						? stripWrapper(data.campaign)
						: null,
				country: !!country ? country.toString() : null,
				layout: stripWrapper(data.pageInformation),
				meta: stripWrapper(data.meta),
			} as T & LayoutContextSchema,
		};
	};
}

export function getLayoutDataSSG<T extends { [key: string]: any }>(
	f?: GetStaticProps<T>
): GetStaticProps<T & LayoutContextSchema> {
	// TODO: needs some cleanup
	return async (context: GetStaticPropsContext) => {
		const { data, error } = await request<RequestType>({
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
					campaign:
						data.campaign.data !== null
							? stripWrapper(data.campaign)
							: null,
					country: null,
					layout: stripWrapper(data.pageInformation),
					meta: stripWrapper(data.meta),
				} as T & LayoutContextSchema,
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
				campaign:
					data.campaign.data !== null
						? stripWrapper(data.campaign)
						: null,
				country: null,
				layout: stripWrapper(data.pageInformation),
				meta: stripWrapper(data.meta),
			},
		};
	};
}
