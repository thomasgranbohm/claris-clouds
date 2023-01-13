import { FC } from "react";

import { StrapiImage } from "components/Image";

import { ImageSchema as TImage } from "types/api/strapi";

import classes from "./Cover.module.scss";

interface CoverProps {
	background: TImage;
	foreground: TImage;
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
					loading="eager"
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className={classes["foreground"]}>
				<h1 hidden>{title}</h1>
				<StrapiImage
					image={foreground}
					blur={false}
					priority
					loading="eager"
					style={{
						maxHeight: "60vh",
						maxWidth: "60vw",
						objectFit: "contain",
						objectPosition: "center",
					}}
				/>
			</div>
		</div>
	);
};

export default Cover;
