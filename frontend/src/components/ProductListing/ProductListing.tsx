import { FC } from "react";
import clsx from "clsx";
import { useCartContext } from "contexts/CartContext";

import Button from "components/Button";
import Icon from "components/Icon";
import { ShopifyImage } from "components/Image";
import QuantitySelector from "components/QuantitySelector";
import Typography from "components/Typography";

import { WithClassname } from "types/components";

import parsePrice from "utils/parsePrice";

import classes from "./ProductListing.module.scss";

interface ProductListingProps extends WithClassname {}

const ProductListing: FC<ProductListingProps> = ({ className }) => {
	const { items, removeFromCart, updateCart } = useCartContext();

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
					<div className={classes["quantity"]}>
						<QuantitySelector
							className={classes["selector"]}
							max={item.merchandise.quantityAvailable}
							value={item.quantity}
							onChange={(v) => updateCart(item.id, v)}
						/>
						<Button
							className={classes["delete"]}
							activeClassName={classes["active"]}
							title="Remove from cart"
							onPress={() => removeFromCart(item.id)}
						>
							<Icon
								className={classes["icon"]}
								variant="delete"
							/>
						</Button>
					</div>
					<Typography className={classes["total"]}>
						{parsePrice(item.merchandise.price)}
					</Typography>
				</li>
			))}
		</ul>
	);
};

export default ProductListing;
