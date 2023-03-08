import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetStaticProps,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from "next";

import request from "api/index";

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

type ReturnType = {
	campaign: CampaignSchema | null;
	layout: PageInformationSchema;
	meta: MetadataSchema;
};

export function getLayoutDataSSR<T extends { [key: string]: any }>(
	f?: GetServerSideProps<T>
): GetServerSideProps<T & ReturnType> {
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

		if (!f) {
			return {
				props: {
					campaign:
						data.campaign.data !== null
							? stripWrapper(data.campaign)
							: null,
					layout: stripWrapper(data.pageInformation),
					meta: stripWrapper(data.meta),
				} as T & ReturnType,
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
				layout: stripWrapper(data.pageInformation),
				meta: stripWrapper(data.meta),
			} as T & ReturnType,
		};
	};
}

export function getLayoutDataSSG<T extends { [key: string]: any }>(
	f?: GetStaticProps<T>
): GetStaticProps<T & ReturnType> {
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
					layout: stripWrapper(data.pageInformation),
					meta: stripWrapper(data.meta),
				} as T & ReturnType,
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
				layout: stripWrapper(data.pageInformation),
				meta: stripWrapper(data.meta),
			},
		};
	};
}
