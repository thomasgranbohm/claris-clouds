import { FC, useEffect } from "react";
import { FocusScope, usePreventScroll } from "react-aria";
import { useToggleState } from "react-stately";
import clsx from "clsx";

import Button from "components/aria/Button";
import Icon from "components/Icon";
import Link from "components/Link";
import Navigation from "components/Navigation";

import useBreakpoint from "hooks/useBreakpoint";

import PageInformationSchema from "types/api/page-information";
import { WithClassname } from "types/components";

import stripWrapper from "utils/stripWrapper";

import classes from "./Header.module.scss";

interface HeaderProps
	extends WithClassname,
		Omit<PageInformationSchema, "favicon"> {
	// Remove me
}

const Header: FC<HeaderProps> = ({ className, links, logo }) => {
	const strippedLogo = stripWrapper(logo);

	const { isSelected, setSelected, toggle } = useToggleState();

	const breakpoint = useBreakpoint();

	usePreventScroll({
		isDisabled: breakpoint !== null || !isSelected,
	});

	return (
		<FocusScope contain={isSelected}>
			<div
				className={clsx(
					classes["container"],
					isSelected && classes["open"],
					className
				)}
			>
				<div className={classes["inner"]}>
					<Link className={classes["home-link"]} href="/">
						{/* TODO: Add logo */}
						<Icon variant="ruler" className={classes["icon"]} />
					</Link>
					<Button className={classes["button"]} onPress={toggle}>
						<Icon
							className={classes["icon"]}
							variant={isSelected ? "x-mark" : "bars"}
						/>
					</Button>
					<Navigation
						className={classes["navigation"]}
						links={links}
					/>
				</div>
			</div>
		</FocusScope>
	);
};

export default Header;
