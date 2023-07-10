import { FC, Fragment } from "react";
import { Item } from "react-stately";
import { AddToCartButton } from "@shopify/hydrogen-react";

import { StyledButton } from "components/Button";
import { Column, Row } from "components/Grid";
import OptionSelector from "components/OptionSelector";
import QuantitySelector from "components/QuantitySelector";
import Typography from "components/Typography";

import { useArtworkContext } from "contexts/ArtworkContext";

import triggerEcommerceEvent from "hooks/triggerEcommerceEvent";

const VariantSelector: FC = () => {
	const {
		product,
		quantity,
		selectedVariant,
		setQuantity,
		setSelectedOption,
	} = useArtworkContext();

	const hasOnlyOneOption =
		product &&
		product.options &&
		product.options.every((option) => option?.values?.length === 1);

	return (
		<Fragment>
			{product &&
				product.options &&
				product.options.length > 0 &&
				!hasOnlyOneOption &&
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
			{selectedVariant && selectedVariant.quantityAvailable === 0 && (
				<Typography size="small" color="red">
					Variant is sold out.
				</Typography>
			)}
			<Row>
				<Column lg={6} md={12} sm={6}>
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
								triggerEcommerceEvent("add_to_cart", {
									currency:
										selectedVariant.price.currencyCode,
									items: [
										{
											item_id: selectedVariant.sku,
											item_name:
												selectedVariant.title ||
												product?.title,
											price: parseFloat(
												selectedVariant.price.amount
											),
											quantity: quantity,
										},
									],
									value:
										parseFloat(
											selectedVariant.price.amount
										) * quantity,
								});
							}
						}}
					>
						Add to cart
					</AddToCartButton>
				</Column>
			</Row>
		</Fragment>
	);
};

export default VariantSelector;
