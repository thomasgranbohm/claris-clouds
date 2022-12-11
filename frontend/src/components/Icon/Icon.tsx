import { FC } from "react";
import clsx from "clsx";

import CalendarRegularSVG from "assets/icons/calendar-regular.svg";
import ClipboardSVG from "assets/icons/clipboard.svg";
import FullscreenSVG from "assets/icons/fullscreen.svg";
import PaletteSVG from "assets/icons/palette.svg";
import RulerCombinedSVG from "assets/icons/ruler-combined.svg";

import { WithClassname } from "types/components";

import classes from "./Icon.module.scss";

interface IconProps extends WithClassname {
	variant: "calendar" | "fullscreen" | "material" | "palette";
}

const Icon: FC<IconProps> = ({ className, variant }) => {
	let Element = null;

	switch (variant) {
		case "calendar":
			Element = CalendarRegularSVG;
			break;
		case "fullscreen":
			Element = RulerCombinedSVG;
			break;
		case "material":
			Element = ClipboardSVG;
			break;
		case "palette":
			Element = PaletteSVG;
			break;
		default:
			return null;
	}
	return <Element className={clsx(classes["container"], className)} />;
};

export default Icon;
