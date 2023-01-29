import { FC } from "react";

import { StrapiImage } from "components/Image";

import { ImageSchema } from "types/api/strapi";

import classes from "./Cover.module.scss";

interface CoverProps {
	background: ImageSchema;
	foreground: ImageSchema;
	title: string;
}

const Cover: FC<CoverProps> = ({ background, foreground, title }) => {
	return (
		<div className={classes["container"]} role="banner">
			<div className={classes["background"]}>
				<StrapiImage
					image={background}
					blur={false}
					fill
					priority
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className={classes["foreground"]}>
				<h1 hidden>{title}</h1>
				<StrapiImage
					image={foreground}
					blur={false}
					priority
					style={{
						maxHeight: "60vh",
						maxWidth: "80vw",
						objectFit: "contain",
						objectPosition: "center",
					}}
				/>
			</div>
		</div>
	);
};

export default Cover;
