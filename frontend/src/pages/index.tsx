import { Fragment } from "react";

import { getStartPage } from "api/start-page";

import ComponentRenderer from "components/ComponentRenderer";
import Cover from "components/Cover";
import Layout from "components/Layout";

import { StartPage } from "types/api/start-page";
import { LayoutPage } from "types/components";

import getLayoutData from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getServerSideProps = getLayoutData(async () => {
	const { data, error } = await getStartPage();

	if (error) {
		if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
			return {
				notFound: true,
			};
		}

		throw error;
	}

	return {
		props: {
			startPage: stripWrapper<StartPage>(data.startPage),
		},
	};
});

interface StartPageProps {
	startPage: StartPage;
}

const StartPage: LayoutPage<StartPageProps> = ({ layout, startPage }) => {
	const { background, sections, title } = startPage;

	return (
		<Fragment>
			<Cover background={stripWrapper(background)}>{title}</Cover>
			<Layout {...layout}>
				<ComponentRenderer components={sections} />
			</Layout>
		</Fragment>
	);
};

export default StartPage;
