import { ButtonHTMLAttributes, FC, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import clsx from "clsx";

import FocusRing from "components/FocusRing";
import Heading from "components/Heading";

import { WithClassname } from "types/components";

import classes from "./Button.module.scss";

interface ButtonProps
	extends WithClassname,
		AriaButtonProps,
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof AriaButtonProps> {
	activeClassName?: string;
	disabledClassName?: string;
}

export const StyledButton: FC<ButtonProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<Button {...props} className={clsx(classes["styled"], className)}>
			<Heading className={classes["title"]} type="b">
				{children}
			</Heading>
		</Button>
	);
};

const Button: FC<ButtonProps> = ({
	activeClassName,
	className,
	disabledClassName,
	...props
}) => {
	const ref = useRef(null);
	const { buttonProps, isPressed } = useButton(props, ref);

	return (
		<FocusRing>
			<button
				{...props}
				{...buttonProps}
				ref={ref}
				className={clsx(
					classes["container"],
					isPressed && activeClassName,
					buttonProps.disabled && disabledClassName,
					className
				)}
			>
				{props.children}
			</button>
		</FocusRing>
	);
};

Button.displayName = "Button";

export default Button;
