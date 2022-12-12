import { FC } from "react";
import clsx from "clsx";
import { link } from "fs";

import Heading from "components/Heading";
import Link from "components/Link";
import Typography from "components/Typography";

import Components from "types/api/components";
import { WithClassname } from "types/components";

import classes from "./Footer.module.scss";

const LinkSection: FC<{ links: Components.Link[]; title: string }> = ({
	links,
	title,
}) => {
	return (
		<div className={classes["section"]}>
			<Heading type="b">{title}</Heading>
			<ul className={classes["links"]}>
				{links.map(({ label, path }, i) => (
					<Link href={path} key={i} className={classes["link"]}>
						<li>{label}</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

interface FooterProps extends WithClassname {
	links?: Components.Link[];
	socials?: Components.Social[];
}

const Footer: FC<FooterProps> = ({ className, links, socials }) => {
	return (
		<footer className={clsx(classes["container"], className)}>
			<div className={classes["sections"]}>
				{links && <LinkSection title="Links" links={links} />}
				{socials && (
					<LinkSection
						title="Socials"
						links={socials.map(({ link, type }) => ({
							label: type,
							path: link,
						}))}
					/>
				)}
			</div>
			<div className={classes["copyright"]}>
				<Typography>
					&copy; {new Date().getUTCFullYear()} Clari&apos;s Clouds
				</Typography>
			</div>
		</footer>
	);
};

export default Footer;
