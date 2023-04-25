const triggerEcommerceEvent = (event_name: string, ecommerce: object) => {
	if (typeof window !== "undefined") {
		window.dataLayer = window.dataLayer || [];

		window.dataLayer.push({
			ecommerce: null,
		});

		window.dataLayer.push({
			ecommerce,
			event: event_name,
		});
	}
};

export default triggerEcommerceEvent;
