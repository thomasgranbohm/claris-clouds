import { FC, ReactNode } from "react";
import {
	CartLineProvider,
	Image,
	Money,
	useCart,
} from "@shopify/hydrogen-react";
import { CartLine } from "@shopify/hydrogen-react/storefront-api-types";
import clsx from "clsx";

import CartLineQuantitySelector from "components/CartLineQuantitySelector";
import Link from "components/Link";
import Typography from "components/Typography";

import { WithClassname } from "types/components";

import classes from "./ProductListing.module.scss";

const LineItem = (item: CartLine) => (
	<CartLineProvider line={item}>
		<li className={classes["item"]}>
			{item.merchandise.image && (
				<div className={classes["image"]}>
					{/* eslint-disable-next-line jsx-a11y/alt-text */}
					<Image
						data={item.merchandise.image}
						widths={[96, 128, 192]}
						style={{
							height: "auto",
							objectFit: "contain",
							objectPosition: "top",
							width: "100%",
						}}
					/>
				</div>
			)}
			<div className={classes["information"]}>
				<Link
					className={classes["link"]}
					href={`/artwork/${item.merchandise.product.handle}`}
					asWrapper
				>
					<Typography
						size="large"
						color="foreground"
						className={classes["title"]}
					>
						<b>{item.merchandise.product.title}</b>
					</Typography>
				</Link>
				{item.merchandise.selectedOptions?.reduce<ReactNode[]>(
					(p, c) =>
						c
							? [
									...p,
									<Typography
										key={c.name}
										color="gray"
										size="small"
									>
										{c.name}: {c.value}
									</Typography>,
							  ]
							: p,
					[]
				)}
			</div>
			<CartLineQuantitySelector className={classes["quantity"]} />
			{item.cost && (
				<Typography className={classes["total"]}>
					<Money data={item.cost.subtotalAmount} as="span" />
				</Typography>
			)}
		</li>
	</CartLineProvider>
);

interface ProductListingProps extends WithClassname {}

const ProductListing: FC<ProductListingProps> = ({ className }) => {
	const { lines } = useCart();

	return (
		<ul className={clsx(classes["container"], className)}>
			{lines &&
				lines.length > 0 &&
				lines.reduce<ReactNode[]>(
					(arr, item) =>
						item && item.merchandise
							? [
									...arr,
									<LineItem
										key={item.id}
										{...(item as CartLine)}
									/>,
							  ]
							: arr,
					[]
				)}
		</ul>
	);
};

export default ProductListing;
