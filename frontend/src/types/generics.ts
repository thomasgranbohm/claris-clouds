export type Colors =
	| "foreground"
	| "background"
	| "gray"
	| "accent"
	| "white"
	| "black"
	| "red";

export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b";

export enum Breakpoint {
	xs = 480,
	sm = 768,
	md = 960,
	lg = 1470,
	xl = 2400,
}

export type BreakpointNames = keyof typeof Breakpoint;
