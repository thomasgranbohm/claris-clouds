import { ButtonHTMLAttributes, FC, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import clsx from "clsx";

import { useFocusRing } from "components/FocusRing";
import Heading from "components/Heading";

import { WithClassname } from "types/components";

import classes from "./Button.module.scss";

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
	focusedClassname,
	isDisabled,
	onPress,
	...props
}) => {
	const ref = useRef(null);
	const { buttonProps, isPressed } = useButton(
		{ ...props, isDisabled, onPress },
		ref
	);
	const { focusProps, focusVisibleClass, isFocusVisible, isFocused } =
		useFocusRing();

	return (
		<button
			{...props}
			{...buttonProps}
			{...focusProps}
			ref={ref}
			className={clsx(
				classes["container"],
				isPressed && activeClassName,
				buttonProps.disabled && disabledClassName,
				isFocusVisible && focusedClassname,
				className,
				focusVisibleClass
			)}
		>
			{props.children}
		</button>
	);
};

interface ButtonProps
	extends WithClassname,
		AriaButtonProps,
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof AriaButtonProps> {
	activeClassName?: string;
	disabledClassName?: string;
	focusedClassname?: string;
}

export default Button;
