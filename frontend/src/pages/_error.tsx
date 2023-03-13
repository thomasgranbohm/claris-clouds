import { NextPage } from "next";

import { Column, Row } from "components/Grid";
import { PageTitle } from "components/Heading";
import Layout from "components/Layout";
import MetaData from "components/MetaData";

import { getLayoutDataSSR } from "utils/getLayoutData";

interface ErrorPageProps {
	statusCode: number;
}

export const getServerSideProps = getLayoutDataSSR(async ({ res }) => {
	return {
		props: {
			statusCode: res.statusCode,
		},
	};
});

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
	const title = "Something went wrong. Please try again later.";

	return (
		<Layout>
			<MetaData title={title} noindex />
			<Row>
				<Column>
					<PageTitle>
						{statusCode} - {title}
					</PageTitle>
				</Column>
			</Row>
		</Layout>
	);
};

export default ErrorPage;
