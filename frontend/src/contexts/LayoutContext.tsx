import { createContext, useContext } from "react";
import { CountryCode } from "@shopify/hydrogen-react/storefront-api-types";

import CampaignSchema from "types/api/campaign";
import MetadataSchema from "types/api/metadata";
import PageInformationSchema from "types/api/page-information";

export type LayoutContextSchema = {
	campaign: CampaignSchema | null;
	country: CountryCode | null;
	layout: PageInformationSchema | null;
	meta: MetadataSchema | null;
};

const LayoutContext = createContext<LayoutContextSchema>({
	campaign: null,
	country: null,
	layout: null,
	meta: null,
});

export const useLayoutContext = () => useContext(LayoutContext);

export default LayoutContext;
