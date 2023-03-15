import Components from "types/api/components";

type MetaTag = { content: string; name?: string; property?: string };

type PageInformationSchema = {
	cookie_consent_text: string;
	legal?: Components.Link[];
	links?: Components.Link[];
	metatags?: MetaTag[];
	page_prefix: string;
	socials?: Components.Social[];
};

export default PageInformationSchema;
