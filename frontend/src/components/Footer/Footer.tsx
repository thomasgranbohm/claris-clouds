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
		<Column className={classes["section"]} md={3} sm={4} xs={6}>
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
		</Column>
	);
};

interface FooterProps extends WithClassname {
	legal?: Components.Link[];
	links?: Components.Link[];
	socials?: Components.Social[];
}

const Footer: FC<FooterProps> = ({ className, legal, links, socials }) => {
	return (
		<footer className={clsx(classes["container"], className)}>
			<Row className={classes["sections"]}>
				{links && links.length > 0 && (
					<LinkSection title="Navigation" links={links} />
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
			</Row>
			<Row>
				<Column>
					<div className={classes["legal"]}>
						{legal && (
							<ul className={classes["links"]}>
								{legal.map(({ label, path }) => (
									<li key={label} className={classes["item"]}>
										<Link
											className={classes["link"]}
											href={path}
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
				</Column>
			</Row>
			<Row>
				<Column>
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
