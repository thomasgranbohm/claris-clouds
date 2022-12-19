import { FC } from "react";
import clsx from "clsx";

import Column from "components/Column";
import Heading from "components/Heading";
import Link from "components/Link";
import Row from "components/Row";
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
					<li key={i}>
						<Link href={path} className={classes["link"]}>
							{label}
						</Link>
					</li>
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
			<Row>
				<Column>
					<div className={classes["sections"]}>
						{links && links.length > 0 && (
							<LinkSection title="Links" links={links} />
						)}
						{socials && socials.length > 0 && (
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
							&copy; {new Date().getUTCFullYear()} Clari&apos;s
							Clouds
						</Typography>
					</div>
				</Column>
			</Row>
		</footer>
	);
};

export default Footer;
