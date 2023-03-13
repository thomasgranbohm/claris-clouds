import { Fragment } from "react";
import { NextPage } from "next";

import { getStartPage } from "api/start-page";

import ComponentRenderer from "components/ComponentRenderer";
import Cover from "components/Cover";
import Layout from "components/Layout";
import { StrapiMetadata } from "components/MetaData";

import { StartPage } from "types/api/start-page";

import { getLayoutDataSSG } from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getStaticProps = getLayoutDataSSG(async () => {
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

const StartPage: NextPage<StartPageProps> = ({ startPage }) => {
	const { background, foreground, sections, seo, title } = startPage;

	return (
		<Fragment>
			<StrapiMetadata
				defaultTitle={seo?.title || title}
				description={seo?.description}
				image={seo?.image}
			/>
			<Cover
				background={stripWrapper(background)}
				foreground={stripWrapper(foreground)}
				title={title}
			/>
			<Layout conformity={false}>
				<ComponentRenderer components={sections} />
			</Layout>
		</Fragment>
	);
};

export default StartPage;
