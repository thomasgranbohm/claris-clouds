import { FC, ReactNode } from "react";
import clsx from "clsx";

import Heading from "components/Heading";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Button.module.scss";

interface ButtonProps extends WithClassname, WithChildren {}

const Button: FC<ButtonProps> = ({ children, className }) => {
	return (
		<div className={clsx(classes["container"], className)}>
			<Heading className={classes["title"]} color="background" type="b">
				{children}
			</Heading>
		</div>
	);
};

export default Button;
