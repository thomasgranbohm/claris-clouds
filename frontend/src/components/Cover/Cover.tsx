import { FC } from "react";

import Heading from "components/Heading";
import Image from "components/Image";

import { Image as TImage } from "types/api/strapi";
import { WithChildren } from "types/components";

import classes from "./Cover.module.scss";

interface CoverProps extends WithChildren {
	background: TImage;
}

const Cover: FC<CoverProps> = ({ background, children }) => {
	return (
		<div className={classes["container"]}>
			<div className={classes["background"]}>
				<Image
					alt={background.alternativeText}
					height={background.height}
					layout="fill"
					src={background.hash + background.ext}
					width={background.width}
				/>
			</div>
			<div className={classes["foreground"]}>
				<Heading className={classes["title"]} type="h1" color="white">
					{children}
				</Heading>
			</div>
		</div>
	);
};

export default Cover;
