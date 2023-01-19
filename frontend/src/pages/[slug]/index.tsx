import { GetStaticPaths } from "next";

import { getPage, getPageSlugs } from "api/page";

import Column from "components/Column";
import ComponentRenderer from "components/ComponentRenderer";
import Heading, { PageTitle } from "components/Heading";
import Layout from "components/Layout";
import MetaData from "components/MetaData";
import Row from "components/Row";
import Typography from "components/Typography";

import { PageSchema } from "types/api/page";
import { LayoutPage } from "types/components";

import getLayoutData from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getStaticProps = getLayoutData<GenericPageProps>(
	async ({ params }) => {
		const slug = params?.["slug"];

		if (!slug) {
			return {
				notFound: true,
			};
		}

		const { data, error } = await getPage(slug.toString());

		if (error) {
			if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
				return {
					notFound: true,
				};
			} else {
				throw error;
			}
		}

		return {
			props: { page: stripWrapper(data.page) },
			revalidate: 60,
		};
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	if (process.env.TARGET !== "production") {
		return { fallback: "blocking", paths: [] };
	}

	const { data } = await getPageSlugs();

	return {
		fallback: "blocking",
		paths: stripWrapper(data.pages).map((p) => ({
			params: { slug: p.slug },
		})),
	};
};

interface GenericPageProps {
	page: PageSchema;
}

const GenericPage: LayoutPage<GenericPageProps> = ({ layout, page }) => {
	const { accessibility, sections, title } = page;

	return (
		<Layout {...layout}>
			<MetaData
				title={accessibility?.title || title}
				description={accessibility?.description}
			/>
			<Row>
				<Column md={[8, 2]} xl={[6, 3]}>
					<PageTitle>{title}</PageTitle>
				</Column>
			</Row>
			<ComponentRenderer components={sections} />
		</Layout>
	);
};

export default GenericPage;
