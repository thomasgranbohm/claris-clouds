import { FC } from "react";
import { FocusScope, usePreventScroll } from "react-aria";
import { useToggleState } from "react-stately";
import { useCart } from "@shopify/hydrogen-react";
import clsx from "clsx";
import { useRouter } from "next/router";

import LogoSVG from "assets/images/logo.svg";

import Button from "components/Button";
import Icon from "components/Icon";
import Link from "components/Link";
import Navigation from "components/Navigation";
import Typography from "components/Typography";

import useBreakpoint from "hooks/useBreakpoint";

import PageInformationSchema from "types/api/page-information";
import { WithClassname } from "types/components";
import { Breakpoint } from "types/generics";

import classes from "./Header.module.scss";

interface HeaderProps
	extends WithClassname,
		Pick<PageInformationSchema, "links" | "socials"> {}

const Header: FC<HeaderProps> = ({ className, links, socials }) => {
	const { totalQuantity } = useCart();
	const { isSelected, toggle } = useToggleState();
	const router = useRouter();

	const breakpoint = useBreakpoint();

	usePreventScroll({
		isDisabled: Number(breakpoint) > Breakpoint.sm || !isSelected,
	});

	const CartLink: FC<WithClassname> = ({ className }) => (
		<Link
			href="/cart"
			className={clsx(
				classes["cart"],
				router.asPath === "/cart" && classes["active"],
				className
			)}
			aria-label="Cart"
		>
			<Icon variant="shopping_cart" className={classes["icon"]} />
			{totalQuantity > 0 && (
				<Typography
					type="span"
					size="smaller"
					className={classes["quantity"]}
				>
					<b>{totalQuantity}</b>
				</Typography>
			)}
		</Link>
	);

	return (
		<FocusScope contain={Number(breakpoint) <= Breakpoint.sm && isSelected}>
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
						<LogoSVG
							aria-label="Website logo"
							className={classes["icon"]}
						/>
					</Link>
					<CartLink className={classes["mobile"]} />
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
					<CartLink className={classes["desktop"]} />
				</div>
			</div>
		</FocusScope>
	);
};

export default Header;
