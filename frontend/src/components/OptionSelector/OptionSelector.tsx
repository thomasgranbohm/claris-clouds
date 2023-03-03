import { useRef } from "react";
import { useListBox, useOption } from "react-aria";
import { ListState, useListState } from "react-stately";
import type { AriaListBoxProps } from "@react-types/listbox";
import type { Node } from "@react-types/shared";
import clsx from "clsx";

import FocusRing from "components/aria/FocusRing";
import Typography from "components/Typography";

import { WithClassname } from "types/components";

import classes from "./OptionSelector.module.scss";

interface OptionProps<T extends object> {
	item: Node<T>;
	state: ListState<T>;
}

export const Option = <T extends object>({ item, state }: OptionProps<T>) => {
	const ref = useRef(null);
	const { isDisabled, isSelected, optionProps } = useOption(
		{ key: item.key },
		state,
		ref
	);

	return (
		<FocusRing>
			<li
				{...optionProps}
				ref={ref}
				className={clsx(
					classes["item"],
					isDisabled && classes["disabled"],
					isSelected && classes["selected"]
				)}
			>
				{item.rendered}
			</li>
		</FocusRing>
	);
};

interface OptionSelectorProps<T extends object>
	extends AriaListBoxProps<T>,
		WithClassname {
	label: string;
}

const OptionSelector = <T extends object>({
	className,
	...props
}: OptionSelectorProps<T>) => {
	const state = useListState(props);

	const ref = useRef(null);
	const { labelProps, listBoxProps } = useListBox(props, state, ref);

	return (
		<div className={clsx(classes["container"], className)}>
			<Typography
				{...labelProps}
				className={classes["label"]}
				weight="bold"
			>
				{props.label}
			</Typography>
			<ul {...listBoxProps} ref={ref} className={classes["list"]}>
				{Array.from(state.collection).map((item) => (
					<Option key={item.key} item={item} state={state} />
				))}
			</ul>
		</div>
	);
};

export default OptionSelector;
