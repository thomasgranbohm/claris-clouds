import { FC, SVGAttributes } from "react";
import clsx from "clsx";

import AddSVG from "assets/icons/add.svg";
import ArrowBackwardSVG from "assets/icons/arrow-backward.svg";
import ArrowForwardSVG from "assets/icons/arrow-forward.svg";
import BarsSVG from "assets/icons/bars-solid.svg";
import CalendarRegularSVG from "assets/icons/calendar-regular.svg";
import ClipboardSVG from "assets/icons/clipboard.svg";
import DeleteSVG from "assets/icons/delete.svg";
import DoneSVG from "assets/icons/done.svg";
import InstagramSVG from "assets/icons/instagram.svg";
import PaletteSVG from "assets/icons/palette.svg";
import RedBubbleSVG from "assets/icons/redbubble.svg";
import RemoveSVG from "assets/icons/remove.svg";
import RulerCombinedSVG from "assets/icons/ruler-combined.svg";
import ShoppingCartSVG from "assets/icons/shopping_cart.svg";
import SpinnerAnimatedSVG from "assets/icons/spinner-animated.svg";
import TikTokSVG from "assets/icons/tiktok.svg";
import XMarkSVG from "assets/icons/xmark-solid.svg";
import YouTubeSVG from "assets/icons/youtube.svg";

import { WithClassname } from "types/components";
import { Colors } from "types/generics";

import classes from "./Icon.module.scss";

interface IconProps extends WithClassname, SVGAttributes<SVGElement> {
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
		| "done"
		| "shopping_cart"
		| "add"
		| "remove"
		| "decrease"
		| "spinner-animated";
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
			Element = TikTokSVG;
			break;
		case "youtube":
			Element = YouTubeSVG;
			break;
		case "backward":
			Element = ArrowBackwardSVG;
			break;
		case "forward":
			Element = ArrowForwardSVG;
			break;
		case "done":
			Element = DoneSVG;
			break;
		case "shopping_cart":
			Element = ShoppingCartSVG;
			break;
		case "add":
			Element = AddSVG;
			break;
		case "decrease":
			Element = RemoveSVG;
			break;
		case "remove":
			Element = DeleteSVG;
			break;
		case "spinner-animated":
			Element = SpinnerAnimatedSVG;
			break;
		default:
			return null;
	}

	return (
		<Element
			aria-label={`${variant} icon`}
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
