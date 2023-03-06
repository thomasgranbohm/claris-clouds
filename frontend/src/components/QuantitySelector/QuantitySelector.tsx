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
	const addQuantity = () => value < max && onChange(value + 1);
	const removeQuantity = () => value > min && onChange(value - 1);

	useEffect(() => {
		if (value > max) {
			onChange(max);
		} else if (min > value) {
			onChange(min);
		}
	}, [min, max, value, onChange]);

	return (
		<div className={clsx(classes["container"], className)}>
			{label && (
				<Typography className={classes["label"]} weight="bold">
					{label}
				</Typography>
			)}
			<div className={classes["controls"]}>
				<Button
					className={classes["button"]}
					disabledClassName={classes["disabled"]}
					activeClassName={classes["active"]}
					isDisabled={value + 1 > max}
					onPress={addQuantity}
				>
					<Icon variant="add" />
				</Button>
				<Typography type="span">{value}</Typography>
				<Button
					className={classes["button"]}
					disabledClassName={classes["disabled"]}
					isDisabled={value - 1 < min}
					onPress={removeQuantity}
				>
					<Icon variant="remove" />
				</Button>
			</div>
		</div>
	);
};

export default QuantitySelector;
