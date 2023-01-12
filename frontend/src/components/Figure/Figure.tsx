import { FC } from "react";
import clsx from "clsx";

import Typography from "components/Typography";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Figure.module.scss";

interface FigureProps extends WithClassname, WithChildren {
	caption?: string;
}

const Figure: FC<FigureProps> = ({ caption, children, className }) => {
	return (
		<figure className={clsx(classes["container"], className)}>
			{children}
			{caption && (
				<figcaption className={classes["caption"]}>
					<Typography color="gray">{caption}</Typography>
				</figcaption>
			)}
		</figure>
	);
};

export default Figure;
