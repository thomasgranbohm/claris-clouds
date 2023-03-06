import { FC } from "react";
import clsx from "clsx";
import { useCartContext } from "contexts/CartContext";

import { ShopifyImage } from "components/Image";
import QuantitySelector from "components/QuantitySelector";
import Typography from "components/Typography";

import { WithClassname } from "types/components";

import classes from "./ProductListing.module.scss";

interface ProductListingProps extends WithClassname {}

const ProductListing: FC<ProductListingProps> = ({ className }) => {
	const { items, updateCart } = useCartContext();

	return (
		<ul className={clsx(classes["container"], className)}>
			{items.map((item) => (
				<li key={item.id} className={classes["item"]}>
					<div className={classes["image"]}>
						<ShopifyImage
							image={item.merchandise.image}
							fill
							width={192}
							style={{
								objectFit: "contain",
								objectPosition: "top",
							}}
						/>
					</div>
					<div className={classes["information"]}>
						<Typography
							size="large"
							weight="bold"
							className={classes["title"]}
						>
							{item.merchandise.product.title}
						</Typography>
						{item.merchandise.selectedOptions.map(
							({ name, value }) => (
								<Typography
									key={name}
									color="gray"
									size="small"
								>
									{name}: {value}
								</Typography>
							)
						)}
					</div>
					<QuantitySelector
						className={classes["quantity"]}
						max={item.merchandise.quantityAvailable}
						value={item.quantity}
						onChange={(v) => updateCart(item.id, v)}
					/>
					<Typography className={classes["total"]}>
						{(
							item.quantity *
							Number(item.merchandise.price.amount)
						).toFixed(2)}{" "}
						{item.merchandise.price.currencyCode}
					</Typography>
				</li>
			))}
		</ul>
	);
};

export default ProductListing;
