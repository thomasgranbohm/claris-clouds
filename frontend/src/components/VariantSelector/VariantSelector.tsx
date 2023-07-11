import { FC, Fragment } from "react";
import { Item } from "react-stately";
import { AddToCartButton } from "@shopify/hydrogen-react";

import { StyledButton } from "components/Button";
import OptionSelector from "components/OptionSelector";
import QuantitySelector from "components/QuantitySelector";
import Typography from "components/Typography";

import { useArtworkContext } from "contexts/ArtworkContext";

import triggerEcommerceEvent from "hooks/triggerEcommerceEvent";

const VariantSelector: FC = () => {
	const {
		hasMultipleVariants,
		product,
		quantity,
		selectedVariant,
		setQuantity,
		setSelectedOption,
	} = useArtworkContext();

	return (
		<Fragment>
			{product &&
				hasMultipleVariants &&
				product.options
					.filter(
						(option) =>
							option && option.values && option.values.length > 1
					)
					.map((option) =>
						option && Array.isArray(option.values) ? (
							<OptionSelector
								key={option.name}
								label={option.name || ""}
								selectionMode="single"
								onSelectionChange={(keys) => {
									const selectedKey = Array.from(keys).pop();

									if (!option.name) {
										return null;
									}

									setSelectedOption(
										option.name,
										selectedKey
											? selectedKey.toString()
											: null
									);
								}}
							>
								{option.values.map((value) => (
									<Item key={value}>{value}</Item>
								))}
							</OptionSelector>
						) : null
					)}
			{/* If the product has multiple variants, or it doesn't and the total amount exceeds one, show the Quantity Selector */}
			{hasMultipleVariants ||
				(Number(product?.totalInventory) > 1 && (
					<QuantitySelector
						label="Quantity"
						max={
							Number(selectedVariant?.quantityAvailable) > 0
								? Number(selectedVariant?.quantityAvailable)
								: 5
						}
						onChange={setQuantity}
						value={quantity}
						min={0}
					/>
				))}
			{/* If product has multiple variants and that variant is sold out, 
			or product doesn't have variants but is sold out, 
			show text displaying that the product or variant is sold out  */}
			{(hasMultipleVariants &&
				selectedVariant &&
				selectedVariant.quantityAvailable === 0 && (
					<Typography size="small" color="red">
						Variant is sold out.
					</Typography>
				)) ||
				(Number(product?.totalInventory) === 0 && (
					<Typography size="small" color="red">
						Product is sold out
					</Typography>
				))}
			<AddToCartButton
				as={StyledButton}
				isDisabled={
					!selectedVariant ||
					selectedVariant.quantityAvailable === 0 ||
					quantity === 0
				}
				variantId={selectedVariant?.id}
				quantity={quantity}
				onClick={() => {
					if (
						selectedVariant &&
						selectedVariant.price &&
						selectedVariant.price.amount
					) {
						console.log("Triggering");

						triggerEcommerceEvent("add_to_cart", {
							currency: selectedVariant.price.currencyCode,
							items: [
								{
									item_id:
										selectedVariant.sku || product?.handle,
									item_name: hasMultipleVariants
										? selectedVariant.title
										: product?.title,
									price: parseFloat(
										selectedVariant.price.amount
									),
									quantity: quantity,
								},
							],
							value:
								parseFloat(selectedVariant.price.amount) *
								quantity,
						});
					}
				}}
			>
				Add to cart
			</AddToCartButton>
		</Fragment>
	);
};

export default VariantSelector;
