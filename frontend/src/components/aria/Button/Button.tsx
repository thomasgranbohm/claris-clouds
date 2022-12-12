import { createRef, FC, forwardRef, ReactNode, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import clsx from "clsx";

import Heading from "components/Heading";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Button.module.scss";

interface ButtonProps extends WithClassname, AriaButtonProps {
	activeClassName?: string;
}

const Button: FC<ButtonProps> = ({ activeClassName, className, ...props }) => {
	const ref = useRef(null);
	const { buttonProps, isPressed } = useButton(props, ref);

	return (
		<button
			{...buttonProps}
			ref={ref}
			className={clsx(
				classes["container"],
				isPressed && activeClassName,
				className
			)}
		>
			{props.children}
		</button>
	);
};

export default Button;
