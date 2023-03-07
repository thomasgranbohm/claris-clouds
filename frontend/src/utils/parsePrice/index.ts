import { format } from "util";

import { Shopify } from "types/api/shopify";

const known_currencies = new Map([
	["EUR", "€%s EUR"],
	["USD", "$%s USD"],
]);

const parsePrice = (price: Shopify.Price): string => {
	const currency = known_currencies.get(price.currencyCode);

	if (!currency) {
		return Number(price.amount).toFixed(2);
	}

	return format(currency, Number(price.amount).toFixed(2));
};

export default parsePrice;
