import { FC, HTMLAttributes } from "react";
import clsx from "clsx";

import ArrowBackward from "assets/icons/arrow-backward.svg";
import ArrowForward from "assets/icons/arrow-forward.svg";
import BarsSVG from "assets/icons/bars-solid.svg";
import CalendarRegularSVG from "assets/icons/calendar-regular.svg";
import ClipboardSVG from "assets/icons/clipboard.svg";
import Done from "assets/icons/done.svg";
import InstagramSVG from "assets/icons/instagram.svg";
import PaletteSVG from "assets/icons/palette.svg";
import RedBubbleSVG from "assets/icons/redbubble.svg";
import RulerCombinedSVG from "assets/icons/ruler-combined.svg";
import TikTok from "assets/icons/tiktok.svg";
import XMarkSVG from "assets/icons/xmark-solid.svg";
import YouTube from "assets/icons/youtube.svg";

import { WithClassname } from "types/components";
import { Colors } from "types/generics";

import classes from "./Icon.module.scss";

interface IconProps extends WithClassname, HTMLAttributes<HTMLElement> {
	fill?: Colors;
	variant:
		| "calendar"
		| "forward"
		| "backward"
		| "ruler"
		| "material"
		| "palette"
		| "bars"
		| "x-mark"
		| "instagram"
		| "tiktok"
		| "redbubble"
		| "youtube"
		| "done";
}

const Icon: FC<IconProps> = ({ className, fill, variant, ...props }) => {
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
		case "youtube":
			Element = YouTube;
			break;
		case "backward":
			Element = ArrowBackward;
			break;
		case "forward":
			Element = ArrowForward;
			break;
		case "done":
			Element = Done;
			break;
		default:
			return null;
	}

	return (
		<Element
			{...props}
			className={clsx(
				classes["container"],
				classes[`fill--${fill}`],
				className
			)}
		/>
	);
};

export default Icon;
