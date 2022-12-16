import Heading from "components/Heading";
import Layout from "components/Layout";

import { LayoutPage } from "types/components";

import getLayoutData from "utils/getLayoutData";

interface ErrorPageProps {
	statusCode: number;
}

export const getServerSideProps = getLayoutData(async ({ res }) => {
	return {
		props: {
			statusCode: res.statusCode,
		},
	};
});

const ErrorPage: LayoutPage<ErrorPageProps> = ({ layout, statusCode }) => {
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

export default ErrorPage;
