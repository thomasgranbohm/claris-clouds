import { createContext, FC, useContext, useEffect, useState } from "react";
import {
	flattenConnection,
	ProductProvider,
	useProduct,
} from "@shopify/hydrogen-react";
import {
	Product,
	ProductVariant,
} from "@shopify/hydrogen-react/storefront-api-types";

import { WithChildren } from "types/components";

export type ArtworkContextSchema = {
	product: Product | null;
	quantity: number;
	selectedOptions: Map<string, string>;
	selectedVariant: ProductVariant | null;
	setQuantity: (q: number) => void;
	setSelectedOption: (key: string, value: string | null) => void;
	setSelectedOptions: (selectedOptions: Map<string, string>) => void;
	setSelectedVariant: (v: ProductVariant) => void;
	variants: ProductVariant[];
};

const ArtworkContext = createContext<ArtworkContextSchema>({
	product: null,
	quantity: 1,
	selectedOptions: new Map(),
	selectedVariant: null,
	setQuantity: () => void 0,
	setSelectedOption: () => void 0,
	setSelectedOptions: () => void 0,
	setSelectedVariant: () => void 0,
	variants: [],
});

export const useArtworkContext = () => ({
	...useProduct(),
	...useContext(ArtworkContext),
});

// Custom context in favor of Shopify's own because it was too limiting.
export const ArtworkProvider: FC<WithChildren & { product: Product }> = ({
	children,
	product,
}) => {
	const [quantity, setQuantity] = useState<number>(1);
	const [selectedOptions, setSelectedOptions] = useState<Map<string, string>>(
		new Map()
	);
	const [selectedVariant, setSelectedVariant] =
		useState<ProductVariant | null>(null);

	const variants = flattenConnection(product.variants);

	const setSelectedOption = (key: string, value: string | null) => {
		const clone = new Map(selectedOptions);

		if (value === null) {
			clone.delete(key);
		} else {
			clone.set(key, value);
		}

		setSelectedOptions(clone);
	};

	useEffect(() => {
		const variant = variants.find((variant) => {
			if (!variant || !variant.selectedOptions) {
				return false;
			}

			const variantOptions = new Map(
				variant.selectedOptions.reduce<[string, string][]>((p, c) => {
					if (c && c.name && c.value) {
						p.push([c.name, c.value]);
					}

					return p;
				}, [])
			);

			if (variantOptions.size !== selectedOptions.size) {
				return false;
			}

			return Array.from(variantOptions.entries()).every(
				([key, value]) =>
					selectedOptions.has(key) &&
					selectedOptions.get(key) === value
			);
		});

		setSelectedVariant(variant || null);
	}, [setSelectedVariant, selectedOptions, variants]);

	return (
		<ProductProvider data={product}>
			<ArtworkContext.Provider
				value={{
					product,
					quantity,
					selectedOptions,
					selectedVariant,
					setQuantity,
					setSelectedOption,
					setSelectedOptions,
					setSelectedVariant,
					variants,
				}}
			>
				{children}
			</ArtworkContext.Provider>
		</ProductProvider>
	);
};

export default ArtworkContext;
