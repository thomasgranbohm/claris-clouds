import { FC } from "react";
import { FocusScope, usePreventScroll } from "react-aria";
import { useToggleState } from "react-stately";
import clsx from "clsx";

import Button from "components/aria/Button";
import Icon from "components/Icon";
import { StrapiImage } from "components/Image";
import Link from "components/Link";
import Navigation from "components/Navigation";

import useBreakpoint from "hooks/useBreakpoint";

import PageInformationSchema from "types/api/page-information";
import { WithClassname } from "types/components";
import { Breakpoint } from "types/generics";

import classes from "./Header.module.scss";

interface HeaderProps
	extends WithClassname,
		Pick<PageInformationSchema, "links" | "logo" | "socials"> {
	// Remove me
}

const Header: FC<HeaderProps> = ({ className, links, logo, socials }) => {
	const { isSelected, toggle } = useToggleState();

	const breakpoint = useBreakpoint();

	usePreventScroll({
		isDisabled: Number(breakpoint) > Breakpoint.sm || !isSelected,
	});

	const HeaderInner = () => (
		<div
			className={clsx(
				classes["container"],
				isSelected && classes["open"],
				className
			)}
		>
			<div className={classes["inner"]}>
				<Link
					className={classes["home-link"]}
					href="/"
					aria-label="Home"
				>
					<StrapiImage
						image={logo}
						className={classes["icon"]}
						priority
						blur={false}
						sizes="64px"
					/>
				</Link>
				<Button
					className={classes["button"]}
					onPress={toggle}
					aria-label={isSelected ? "Close menu" : "Open menu"}
				>
					<Icon
						className={classes["icon"]}
						variant={isSelected ? "x-mark" : "bars"}
					/>
				</Button>
				<Navigation
					className={classes["navigation"]}
					links={links}
					socials={socials}
				/>
			</div>
		</div>
	);

	return Number(breakpoint) > Breakpoint.sm ? (
		<HeaderInner />
	) : (
		<FocusScope contain={isSelected}>
			<HeaderInner />
		</FocusScope>
	);
};

export default Header;
