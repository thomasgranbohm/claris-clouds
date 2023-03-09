import { FC } from "react";
import {
	CartLineQuantity,
	CartLineQuantityAdjustButton,
	useCartLine,
} from "@shopify/hydrogen-react";
import clsx from "clsx";

import Button from "components/Button";
import Icon from "components/Icon";

import { WithClassname } from "types/components";

import classes from "./CartLineQuantitySelector.module.scss";

interface CartLineQuantitySelectorProps extends WithClassname {
	// Remove me
}

const CartLineQuantitySelector: FC<CartLineQuantitySelectorProps> = ({
	className,
}) => {
	const { merchandise, quantity } = useCartLine();

	return (
		<div className={clsx(classes["container"], className)}>
			<div className={classes["quantity"]}>
				<CartLineQuantityAdjustButton<typeof Button>
					as={Button}
					adjust="increase"
					className={clsx(classes["button"], classes["increase"])}
					isDisabled={
						Number(quantity || 0) + 1 >
						Number(merchandise?.quantityAvailable || 0)
					}
				>
					<Icon variant="add" />
				</CartLineQuantityAdjustButton>
				<CartLineQuantity className={classes["value"]} />
				<CartLineQuantityAdjustButton<typeof Button>
					as={Button}
					adjust="decrease"
					className={clsx(classes["button"], classes["decrease"])}
					isDisabled={Number(quantity || 0) - 1 < 1}
				>
					<Icon variant="decrease" />
				</CartLineQuantityAdjustButton>
			</div>
			<CartLineQuantityAdjustButton<typeof Button>
				adjust="remove"
				className={clsx(classes["button"], classes["remove"])}
				title="Remove from cart"
				as={Button}
			>
				<Icon className={classes["icon"]} variant="remove" />
			</CartLineQuantityAdjustButton>
		</div>
	);
};

export default CartLineQuantitySelector;
