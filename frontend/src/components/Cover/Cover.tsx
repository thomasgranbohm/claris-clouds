import { FC } from "react";

import { StrapiImage } from "components/Image";

import { ImageSchema as TImage } from "types/api/strapi";

import classes from "./Cover.module.scss";

interface CoverProps {
	background: TImage;
	foreground: TImage;
}

const Cover: FC<CoverProps> = ({ background, foreground }) => {
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
