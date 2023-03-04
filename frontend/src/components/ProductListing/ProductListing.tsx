import { FC } from "react";
import clsx from "clsx";

import { ShopifyImage } from "components/Image";
import Typography from "components/Typography";

import { Shopify } from "types/api/shopify";
import { WithClassname } from "types/components";

import classes from "./ProductListing.module.scss";

interface ProductListingProps extends WithClassname {
	items: Shopify.CartItem[];
}

const ProductListing: FC<ProductListingProps> = ({ className, items }) => {
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

					<Typography className={classes["quantity"]}>
						{item.quantity}
					</Typography>
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
