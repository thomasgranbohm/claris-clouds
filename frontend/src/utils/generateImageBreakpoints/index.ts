import { Breakpoint, BreakpointNames } from "types/generics";

const generateImageBreakpoints = (
	props: Partial<
		{
			[key in BreakpointNames]: number | string;
		}
	>
) => {
	return Object.entries(props)
		.map<[Breakpoint, string]>(([k, v]) => [
			Breakpoint[k as BreakpointNames],
			typeof v === "number"
				? v * Breakpoint[k as BreakpointNames] + "px"
				: v,
		])
		.sort(([a], [b]) => a - b)
		.reduce<string[]>(
			(p, [b, v], i, a) => [
				...p,
				i === a.length - 1 ? v : `(max-width: ${b}px) ${v}`,
			],
			[]
		)
		.join(", \n");
};

export default generateImageBreakpoints;
