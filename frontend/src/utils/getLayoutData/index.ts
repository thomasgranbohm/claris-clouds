import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	GetStaticProps,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from "next";

import { getMetadata } from "api/metadata";
import { getPageInformation } from "api/page-information";

import MetadataSchema from "types/api/metadata";
import { LayoutSchema } from "types/components";

import stripWrapper from "utils/stripWrapper";

export function getLayoutDataSSR<T extends { [key: string]: any }>(
	f: GetServerSideProps<T>
): GetServerSideProps<T & LayoutSchema & { meta: MetadataSchema }> {
	return async (context: GetServerSidePropsContext) => {
		const [
			{ data: dataPI, error: errorPI },
			{ data: dataMD, error: errorMD },
		] = await Promise.all([getPageInformation(), getMetadata()]);

		if (errorPI || errorMD) {
			const error = errorPI || errorMD;

			if (error) {
				if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
					return {
						notFound: true,
					};
				} else {
					throw error;
				}
			}
		}

		const res: GetServerSidePropsResult<T> = await f(context);

		if ("notFound" in res || "redirect" in res) {
			return res;
		}

		return {
			props: {
				...res.props,
				layout: stripWrapper(dataPI.pageInformation),
				meta: stripWrapper(dataMD.meta),
			} as T & LayoutSchema & { meta: MetadataSchema },
		};
	};
}

export function getLayoutDataSSG<T extends { [key: string]: any }>(
	f: GetStaticProps<T>
): GetStaticProps<T & LayoutSchema & { meta: MetadataSchema }> {
	// TODO: needs some cleanup
	return async (context: GetStaticPropsContext) => {
		const [
			{ data: dataPI, error: errorPI },
			{ data: dataMD, error: errorMD },
		] = await Promise.all([getPageInformation(), getMetadata()]);

		if (errorPI || errorMD) {
			const error = errorPI || errorMD;

			if (error) {
				if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
					return {
						notFound: true,
					};
				} else {
					throw error;
				}
			}
		}

		const res: GetStaticPropsResult<T> = await f(context);

		if ("notFound" in res || "redirect" in res) {
			return res;
		}

		return {
			props: {
				...res.props,
				layout: stripWrapper(dataPI.pageInformation),
				meta: stripWrapper(dataMD.meta),
			} as T & LayoutSchema & { meta: MetadataSchema },
		};
	};
}
