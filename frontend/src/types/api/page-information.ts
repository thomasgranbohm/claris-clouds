import Components from "types/api/components";

type PageInformationSchema = {
	cookie_consent_text: string;
	legal?: Components.Link[];
	links?: Components.Link[];
	socials?: Components.Social[];
};

export default PageInformationSchema;
