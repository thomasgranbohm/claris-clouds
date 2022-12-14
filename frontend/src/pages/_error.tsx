import { GetServerSideProps } from "next";

import { getPageInformation } from "api/page-information";

import Heading from "components/Heading";
import Layout from "components/Layout";

import { LayoutPage, LayoutSchema } from "types/components";

import stripWrapper from "utils/stripWrapper";

interface ErrorPageProps {
	statusCode: number;
}

export const getServerSideProps: GetServerSideProps<
	ErrorPageProps & LayoutSchema
> = async ({ res }) => {
	const { data, error } = await getPageInformation();

	if (error) {
		throw error;
	}

	return {
		props: {
			layout: stripWrapper(data.pageInformation),
			statusCode: res.statusCode,
		},
	};
};

const Error404: LayoutPage<{ statusCode: number }> = ({
	layout,
	statusCode,
}) => {
	const title =
		statusCode === 404 ? "Page not found" : "Something went wrong :(";

	return (
		<Layout {...layout}>
			<Heading type="h1">
				{statusCode} - {title}
			</Heading>
		</Layout>
	);
};

export default Error404;
