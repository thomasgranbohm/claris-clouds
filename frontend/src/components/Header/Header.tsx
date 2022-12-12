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
import { BREAKPOINTS } from "types/generics";

import stripWrapper from "utils/stripWrapper";

import classes from "./Header.module.scss";

interface HeaderProps extends WithClassname, PageInformationSchema {
	// Remove me
}

const Header: FC<HeaderProps> = ({ className, links, logo }) => {
	const strippedLogo = stripWrapper(logo);

	const state = useToggleState();

	const breakpoint = useBreakpoint();

	useEffect(() => {
		console.log("Breakpoint: %d", breakpoint);
	}, [breakpoint]);

	usePreventScroll({
		isDisabled: breakpoint !== null || !state.isSelected,
	});

	return (
		<FocusScope contain={state.isSelected}>
			<div
				className={clsx(
					classes["container"],
					state.isSelected && classes["open"],
					className
				)}
			>
				<div className={classes["inner"]}>
					<Link className={classes["home-link"]} href="/">
						<Icon variant="ruler" className={classes["icon"]} />
					</Link>
					<Button
						className={classes["button"]}
						onPress={state.toggle}
					>
						<Icon
							className={classes["icon"]}
							variant={state.isSelected ? "x-mark" : "bars"}
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
