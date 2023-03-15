import { createContext, useContext } from "react";
import { CountryCode } from "@shopify/hydrogen-react/storefront-api-types";

import CampaignSchema from "types/api/campaign";
import PageInformationSchema from "types/api/page-information";

export type LayoutContextSchema = {
	campaign: CampaignSchema | null;
	country: CountryCode | null;
	layout: PageInformationSchema | null;
};

const LayoutContext = createContext<LayoutContextSchema>({
	campaign: null,
	country: null,
	layout: null,
});

export const useLayoutContext = () => useContext(LayoutContext);

export default LayoutContext;
