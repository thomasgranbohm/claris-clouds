export type Colors =
	| "foreground"
	| "background"
	| "gray"
	| "accent"
	| "white"
	| "black";

export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b";

export enum Breakpoint {
	xs = 480,
	sm = 600,
	md = 768,
	lg = 1080,
	xl = 1440,
}

export type BreakpointNames = keyof typeof Breakpoint;
