import { useRouter } from "next/router";

import { getArtwork } from "api/artwork";

import Column from "components/Column";
import Heading from "components/Heading";
import Icon from "components/Icon";
import { StrapiImage } from "components/Image";
import Labeler from "components/Labeler";
import Layout from "components/Layout";
import Link from "components/Link";
import MetaData from "components/MetaData";
import Row from "components/Row";
import StyledButton from "components/StyledButton";
import Typography from "components/Typography";

import classes from "styles/pages/ArtworkPage.module.scss";

import Artwork from "types/api/artwork";
import { LayoutPage } from "types/components";

import getImageLink from "utils/getImageLink";
import getLayoutData from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getServerSideProps = getLayoutData<ArtworkPageProps>(
	async ({ params }) => {
		const slug = params?.["slug"];

		if (!slug) {
			return {
				notFound: true,
			};
		}

		const { data, error } = await getArtwork(slug.toString());

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
			props: { artwork: stripWrapper(data.artwork) },
		};
	}
);

interface ArtworkPageProps {
	artwork: Artwork;
}

const ArtworkPage: LayoutPage<ArtworkPageProps> = ({ artwork, layout }) => {
	const { asPath } = useRouter();
	const {
		description,
		height,
		image: rawImage,
		medium,
		name,
		original_sold,
		redbubble_link,
		width,
		year_of_creation,
	} = artwork;

	const image = stripWrapper(rawImage);

	return (
		<Layout {...layout}>
			<MetaData
				title={name}
				description={description}
				images={[
					{
						alt:
							image.caption ||
							image.alternativeText ||
							image.name,
						height: image.height,
						url: getImageLink(image),
						width: image.width,
					},
					...Object.values(image.formats).map(
						({ height, width, ...i }) => ({
							alt:
								image.caption ||
								image.alternativeText ||
								image.name,
							height,
							url: getImageLink(i),
							width,
						})
					),
				]}
				path={asPath}
			/>
			<Row>
				<Column lg={6} xl={[5, 1]} align="end" justify="end">
					<StrapiImage
						image={image}
						style={{ height: "auto", width: "100%" }}
					/>
				</Column>
				<Column lg={6} xl={5} align="end">
					<Heading type="h2">{name}</Heading>
					<Row row-gap="none">
						<Column md={8} lg={6} align="center">
							<Link href={redbubble_link} asWrapper>
								<StyledButton>Buy a print</StyledButton>
							</Link>
						</Column>
						<Column md={4} lg={6} align="center">
							{!original_sold ? (
								<Typography>
									Wanna buy the original?{" "}
									<Link href="#">Message me about it!</Link>
								</Typography>
							) : (
								<Typography>
									The original has been sold
								</Typography>
							)}
						</Column>
					</Row>
				</Column>
			</Row>
			{[year_of_creation, height, width, medium].every(Boolean) && (
				<Row row-gap="none">
					<Column md={[10, 1]} lg={[8, 2]}>
						<Heading type="h3" look="h4">
							Specifications
						</Heading>
					</Column>
					<Column
						md={[10, 1]}
						lg={[8, 2]}
						className={classes["specifications"]}
					>
						<Labeler label={<Icon variant="ruler" />}>
							{width} × {height} cm
						</Labeler>
						<Labeler label={<Icon variant="material" />}>
							{medium}
						</Labeler>
						<Labeler label={<Icon variant="calendar" />}>
							{year_of_creation}
						</Labeler>
					</Column>
				</Row>
			)}
			{description && (
				<Row>
					<Column md={[8, 2]}>
						<Typography size="large">{description}</Typography>
					</Column>
				</Row>
			)}
		</Layout>
	);
};

export default ArtworkPage;
