import { FC } from "react";
import { Money } from "@shopify/hydrogen-react";

import Typography from "components/Typography";

import { useArtworkContext } from "contexts/ArtworkContext";

const ArtworkPrice: FC = () => {
	const { product, selectedVariant } = useArtworkContext();

	if (product === null) {
		return null;
	}

	return (
		<Typography>
			<b>Price:</b>{" "}
			<Money
				as="span"
				data={
					selectedVariant?.price || product.priceRange.minVariantPrice
				}
			/>
		</Typography>
	);
};

export default ArtworkPrice;
