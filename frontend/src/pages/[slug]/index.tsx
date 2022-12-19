import { getPage } from "api/page";

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

export const getServerSideProps = getLayoutData<GenericPageProps>(
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
				<Column lg={[8, 2]}>
					<PageTitle>{title}</PageTitle>
					{accessibility?.description && (
						<Typography size="large">
							{accessibility.description}
						</Typography>
					)}
				</Column>
			</Row>
			<ComponentRenderer components={sections} />
		</Layout>
	);
};

export default GenericPage;
