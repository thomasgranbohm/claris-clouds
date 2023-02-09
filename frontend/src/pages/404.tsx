import { Column, Row } from "components/Grid";
import { PageTitle } from "components/Heading";
import Layout from "components/Layout";
import MetaData from "components/MetaData";

import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG();

const ErrorPage: LayoutPage = ({ layout }) => {
	return (
		<Layout {...layout}>
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
