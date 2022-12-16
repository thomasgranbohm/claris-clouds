export type Colors =
	| "foreground"
	| "background"
	| "gray"
	| "accent"
	| "white"
	| "black";

export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b";

export enum Breakpoint {
	sm = 580,
	md = 768,
	lg = 1024,
	xl = 1200,
	xxl = 1500,
}
