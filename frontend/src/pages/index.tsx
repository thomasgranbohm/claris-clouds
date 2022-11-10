import { Fragment } from "react";
import type { GetStaticProps, NextPage } from "next";

import { getStartPage } from "api/start-page";

import Column from "components/Column";
import Cover from "components/Cover";
import Layout from "components/Layout";
import Row from "components/Row";
import Typography from "components/Typography";

import { StartPage } from "types/api/start-page";

import stripWrapper from "utils/stripWrapper";

export const getStaticProps: GetStaticProps<StartPageProps> = async () => {
	const { error, ...response } = await getStartPage();

	if (error) {
		if (error.status === 404) {
			return {
				notFound: true,
			};
		} else {
			throw error;
		}
	}

	return {
		props: { startPage: stripWrapper<StartPage>(response) },
		revalidate: 3600,
	};
};

interface StartPageProps {
	startPage: StartPage;
}

const StartPage: NextPage<StartPageProps> = ({ startPage }) => {
	const { background, title } = startPage;

	return (
		<Fragment>
			<Cover background={stripWrapper(background)}>{title}</Cover>
			<Layout>
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
			</Layout>
		</Fragment>
	);
};

export default StartPage;
