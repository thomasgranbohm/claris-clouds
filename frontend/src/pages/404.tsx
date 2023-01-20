import Column from "components/Column";
import { PageTitle } from "components/Heading";
import Layout from "components/Layout";
import MetaData from "components/MetaData";
import Row from "components/Row";

import { LayoutPage } from "types/components";

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
