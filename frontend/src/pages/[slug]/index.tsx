import { GetStaticPaths } from "next";

import { getPage, getPageSlugs } from "api/page";

import ComponentRenderer from "components/ComponentRenderer";
import { Column, Row } from "components/Grid";
import { PageTitle } from "components/Heading";
import Layout from "components/Layout";
import MetaData from "components/MetaData";

import { PageSchema } from "types/api/page";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getStaticProps = getLayoutDataSSG<GenericPageProps>(
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
		};
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	if (process.env.NODE_ENV !== "production") {
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
	const { sections, seo, title } = page;

	return (
		<Layout {...layout}>
			<MetaData
				title={seo?.title || title}
				description={seo?.description}
				images={[seo?.image]}
			/>
			<Row>
				<Column md={[8, 2]} lg={[6, 3]}>
					<PageTitle>{title}</PageTitle>
				</Column>
			</Row>
			<ComponentRenderer components={sections} />
		</Layout>
	);
};

export default GenericPage;
