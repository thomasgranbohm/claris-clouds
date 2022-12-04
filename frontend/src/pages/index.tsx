import { Fragment } from "react";
import { ApolloError, ServerError } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";

import { getStartPage } from "api/start-page";

import Column from "components/Column";
import ComponentRenderer from "components/ComponentRenderer";
import Cover from "components/Cover";
import Layout from "components/Layout";
import Row from "components/Row";
import Typography from "components/Typography";

import { StartPage } from "types/api/start-page";
import { LayoutPage } from "types/components";

import getLayoutData from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getServerSideProps = getLayoutData(async () => {
	try {
		const { data, error } = await getStartPage();

		// TODO: Needs better error handling

		if (error) {
			throw error;
		}

		return {
			props: {
				startPage: stripWrapper<StartPage>(data.startPage),
			},
		};
	} catch (err) {
		if (err instanceof ApolloError) {
			if (err.networkError) {
				console.log((err.networkError as ServerError).result);
			}
		}
		throw err;
	}
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
				<Row>
					<Column>
						<Typography>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Fugit magni aliquid ratione labore cumque,
							iste minima molestiae dolor aperiam quod dolores
							aspernatur ipsum quas. Ipsum non perferendis
							voluptatibus quo dolorem.
						</Typography>
					</Column>
				</Row>
				<ComponentRenderer components={sections} />
			</Layout>
		</Fragment>
	);
};

export default StartPage;
