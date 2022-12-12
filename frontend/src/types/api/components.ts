namespace Components {
	export type SocialType = "Instagram" | "RedBubble" | "TikTok";

	export interface Link {
		label: string;
		path: string;
	}

	export interface Social {
		link: string;
		type: SocialType;
	}
}

export default Components;
