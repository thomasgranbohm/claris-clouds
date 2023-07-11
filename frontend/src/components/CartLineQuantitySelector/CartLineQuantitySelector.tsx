import { FC } from "react";
import {
	CartLineQuantity,
	CartLineQuantityAdjustButton,
	useCartLine,
} from "@shopify/hydrogen-react";
import clsx from "clsx";

import Button from "components/Button";
import Icon from "components/Icon";

import triggerEcommerceEvent from "hooks/triggerEcommerceEvent";

import { WithClassname } from "types/components";

import classes from "./CartLineQuantitySelector.module.scss";

interface CartLineQuantitySelectorProps extends WithClassname {
	// Remove me
}

const CartLineQuantitySelector: FC<CartLineQuantitySelectorProps> = ({
	className,
}) => {
	const { cost, merchandise, quantity } = useCartLine();

	return (
		<div className={clsx(classes["container"], className)}>
			{Number(merchandise?.quantityAvailable) > 1 && (
				<div className={classes["quantity"]}>
					<CartLineQuantityAdjustButton<typeof Button>
						as={Button}
						adjust="increase"
						className={clsx(classes["button"], classes["increase"])}
						isDisabled={
							Number(quantity || 0) + 1 >
							Number(merchandise?.quantityAvailable || 0)
						}
						onClick={() => {
							if (merchandise && cost && quantity) {
								triggerEcommerceEvent("add_to_cart", {
									currency: cost.subtotalAmount?.currencyCode,
									items: [
										{
											item_id: merchandise.sku,
											item_name: merchandise.title,
											price: Number(
												merchandise.price?.amount
											),
											quantity: 1,
										},
									],
									value: Number(merchandise.price?.amount),
								});
							}
						}}
					>
						<Icon variant="add" />
					</CartLineQuantityAdjustButton>
					<CartLineQuantity className={classes["value"]} />
					<CartLineQuantityAdjustButton<typeof Button>
						as={Button}
						adjust="decrease"
						className={clsx(classes["button"], classes["decrease"])}
						isDisabled={Number(quantity || 0) - 1 < 1}
						onClick={() => {
							if (merchandise && cost && quantity) {
								triggerEcommerceEvent("remove_from_cart", {
									currency: cost.subtotalAmount?.currencyCode,
									items: [
										{
											item_id: merchandise.sku,
											item_name: merchandise.title,
											price: Number(
												merchandise.price?.amount
											),
											quantity: 1,
										},
									],
									value: Number(merchandise.price?.amount),
								});
							}
						}}
					>
						<Icon variant="decrease" />
					</CartLineQuantityAdjustButton>
				</div>
			)}
			<CartLineQuantityAdjustButton<typeof Button>
				adjust="remove"
				className={clsx(classes["button"], classes["remove"])}
				title="Remove from cart"
				as={Button}
				onClick={() => {
					if (merchandise && cost && quantity) {
						triggerEcommerceEvent("remove_from_cart", {
							currency: cost.subtotalAmount?.currencyCode,
							items: [
								{
									item_id: merchandise.sku,
									item_name: merchandise.title,
									price: Number(merchandise.price?.amount),
									quantity,
								},
							],
							value: Number(merchandise.price?.amount) * quantity,
						});
					}
				}}
			>
				<Icon className={classes["icon"]} variant="remove" />
			</CartLineQuantityAdjustButton>
		</div>
	);
};

export default CartLineQuantitySelector;
