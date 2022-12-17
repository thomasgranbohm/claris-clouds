import { FC } from "react";
import clsx from "clsx";

import BarsSVG from "assets/icons/bars-solid.svg";
import CalendarRegularSVG from "assets/icons/calendar-regular.svg";
import ClipboardSVG from "assets/icons/clipboard.svg";
import InstagramSVG from "assets/icons/instagram.svg";
import PaletteSVG from "assets/icons/palette.svg";
import RedBubbleSVG from "assets/icons/redbubble.svg";
import RulerCombinedSVG from "assets/icons/ruler-combined.svg";
import TikTok from "assets/icons/tiktok.svg";
import XMarkSVG from "assets/icons/xmark-solid.svg";

import { WithClassname } from "types/components";
import { Colors } from "types/generics";

import classes from "./Icon.module.scss";

interface IconProps extends WithClassname {
	fill?: Colors;
	variant:
		| "calendar"
		| "ruler"
		| "material"
		| "palette"
		| "bars"
		| "x-mark"
		| "instagram"
		| "tiktok"
		| "redbubble";
}

const Icon: FC<IconProps> = ({ className, fill = "foreground", variant }) => {
	let Element = null;

	switch (variant) {
		case "bars":
			Element = BarsSVG;
			break;
		case "calendar":
			Element = CalendarRegularSVG;
			break;
		case "ruler":
			Element = RulerCombinedSVG;
			break;
		case "material":
			Element = ClipboardSVG;
			break;
		case "palette":
			Element = PaletteSVG;
			break;
		case "x-mark":
			Element = XMarkSVG;
			break;
		case "instagram":
			Element = InstagramSVG;
			break;
		case "redbubble":
			Element = RedBubbleSVG;
			break;
		case "tiktok":
			Element = TikTok;
			break;
		default:
			return null;
	}

	return (
		<Element
			className={clsx(
				classes["container"],
				classes[`fill--${fill}`],
				className
			)}
		/>
	);
};

export default Icon;
