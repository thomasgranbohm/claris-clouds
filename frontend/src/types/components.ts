import { ReactNode } from "react";
import { NextPage } from "next";

import CampaignSchema from "types/api/campaign";
import PageInformationSchema from "types/api/page-information";

export interface WithClassname {
	className?: string;
}

export interface WithChildren {
	children: ReactNode;
}

export interface LayoutSchema {
	campaign: CampaignSchema;
	layout: PageInformationSchema;
}

export type LayoutPage<T = unknown> = NextPage<T & LayoutSchema>;
