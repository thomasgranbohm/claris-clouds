import { FC, useEffect, useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Icon from "components/Icon";
import Typography from "components/Typography";

import { WithClassname } from "types/components";

import classes from "./QuantitySelector.module.scss";

interface QuantitySelectorProps extends WithClassname {
	label?: string;
	max: number;
	min?: number;
	onChange: (value: number) => void;
	value: number;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
	className,
	label,
	max,
	min = 1,
	onChange,
	value,
}) => {
	const increaseQuantity = () => value < max && onChange(value + 1);
	const decreaseQuantity = () => value > min && onChange(value - 1);

	useEffect(() => {
		if (value > max) {
			onChange(max);
		}
	}, [min, max, value, onChange]);

	return (
		<div className={clsx(classes["container"], className)}>
			{label && (
				<Typography className={classes["label"]}>
					<b>{label}</b>
				</Typography>
			)}
			<div className={classes["quantity"]}>
				<Button
					className={clsx(classes["button"], classes["increase"])}
					isDisabled={value + 1 > max}
					onPress={increaseQuantity}
				>
					<Icon variant="add" />
				</Button>
				<Typography className={classes["value"]} type="span">
					{value}
				</Typography>
				<Button
					className={clsx(classes["button"], classes["decrease"])}
					isDisabled={value - 1 < min}
					onPress={decreaseQuantity}
				>
					<Icon variant="decrease" />
				</Button>
			</div>
		</div>
	);
};

export default QuantitySelector;
