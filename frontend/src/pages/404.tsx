import { NextPage } from "next";

import { Column, Row } from "components/Grid";
import { PageTitle } from "components/Heading";
import Layout from "components/Layout";
import MetaData from "components/MetaData";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG();

const ErrorPage: NextPage = () => {
	return (
		<Layout>
			<MetaData title="Page not found" noindex />
			<Row>
				<Column>
					<PageTitle>404 - Page not found</PageTitle>
				</Column>
			</Row>
		</Layout>
	);
};

export default ErrorPage;
