import { FC, useRef } from "react";
import { useTab, useTabList, useTabPanel } from "react-aria";
import { TabListProps, TabListState, useTabListState } from "react-stately";
import { Node } from "@react-types/shared";
import clsx from "clsx";

import HocusFocus from "components/FocusRing";
import { Column, Row } from "components/Grid";

import { WithClassname } from "types/components";

import classes from "./Tabs.module.scss";

interface TabsProps extends WithClassname, TabListProps<object> {}

const Tabs: FC<TabsProps> = ({ className, ...props }) => {
	const state = useTabListState(props);
	const ref = useRef(null);
	const { tabListProps } = useTabList(props, state, ref);

	return (
		<div className={clsx(classes["container"], className)}>
			<div {...tabListProps} ref={ref}>
				<Row>
					<Column md={6} lg={[4, 2]} className={classes["header"]}>
						<b>Product type:</b>
						{Array.from(state.collection).map((item) => (
							<Tab key={item.key} item={item} state={state} />
						))}
					</Column>
				</Row>
			</div>
			<TabPanel key={state.selectedItem?.key} state={state} />
		</div>
	);
};

const Tab: FC<{ item: Node<object>; state: TabListState<object> }> = ({
	item,
	state,
}) => {
	const { key, rendered } = item;
	const ref = useRef(null);
	const { isSelected, tabProps } = useTab({ key }, state, ref);

	return (
		<HocusFocus>
			<div
				{...tabProps}
				ref={ref}
				className={clsx(
					classes["tab"],
					isSelected && classes["selected"]
				)}
			>
				{rendered}
			</div>
		</HocusFocus>
	);
};

const TabPanel: FC<{ state: TabListState<object> }> = ({ state, ...props }) => {
	const ref = useRef(null);
	const { tabPanelProps } = useTabPanel(props, state, ref);

	return (
		<div {...tabPanelProps} ref={ref}>
			{state.selectedItem?.props.children}
		</div>
	);
};

export default Tabs;
