import { ReactNode } from "react";
import { NextPage } from "next";

import { LayoutProps } from "components/Layout";

export interface WithClassname {
	className?: string;
}

export interface WithChildren {
	children: ReactNode;
}

export interface LayoutSchema {
	layout: LayoutProps;
}

export type LayoutPage<T> = NextPage<T & LayoutSchema>;
