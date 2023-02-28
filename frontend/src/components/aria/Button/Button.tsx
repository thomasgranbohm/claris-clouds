import {
	ButtonHTMLAttributes,
	forwardRef,
	ForwardRefRenderFunction,
	MutableRefObject,
	useRef,
} from "react";
import { AriaButtonProps, useButton } from "react-aria";
import clsx from "clsx";

import FocusRing from "components/aria/FocusRing";

import { WithClassname } from "types/components";

import classes from "./Button.module.scss";

interface ButtonProps
	extends WithClassname,
		AriaButtonProps,
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof AriaButtonProps> {
	activeClassName?: string;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
	{ activeClassName, className, ...props }: ButtonProps,
	forwardRef
) => {
	const ref = useRef(null);
	const { buttonProps, isPressed } = useButton(
		props,
		(forwardRef as MutableRefObject<HTMLButtonElement | null>) || ref
	);

	return (
		<FocusRing>
			<button
				{...buttonProps}
				ref={forwardRef || ref}
				className={clsx(
					classes["container"],
					isPressed && activeClassName,
					className
				)}
			>
				{props.children}
			</button>
		</FocusRing>
	);
};

Button.displayName = "BUtton";

export default forwardRef(Button);
