import Column from "components/Column";
import { PageTitle } from "components/Heading";
import Layout from "components/Layout";
import MetaData from "components/MetaData";
import Row from "components/Row";

import { LayoutPage } from "types/components";

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

const ErrorPage: LayoutPage<ErrorPageProps> = ({ layout, statusCode }) => {
	const title = "Something went wrong. Please try again later.";

	return (
		<Layout {...layout}>
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
