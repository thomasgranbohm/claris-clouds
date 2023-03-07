import { FC, useEffect, useId, useState } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Icon from "components/Icon";
import Link from "components/Link";
import Typography from "components/Typography";

import CampaignSchema from "types/api/campaign";
import { WithClassname } from "types/components";

import classes from "./Campaign.module.scss";

interface CampaignProps extends WithClassname {
	campaign: CampaignSchema;
}

const Campaign: FC<CampaignProps> = ({ campaign, className }) => {
	const [showCampaign, setShowCampaign] = useState<boolean>(false);

	const { link, text } = campaign;
	const textId = useId();

	useEffect(() => {
		if (campaign && window.localStorage) {
			const closedCampaign =
				window.localStorage.getItem("closed-campaign");

			if (!closedCampaign || closedCampaign !== campaign.link) {
				setShowCampaign(true);

				if (closedCampaign) {
					window.localStorage.removeItem("closed-campaign");
				}
			}
		}
	}, [campaign]);

	return showCampaign ? (
		<div className={clsx(classes["container"], className)}>
			<Link
				className={classes["link"]}
				href={link}
				aria-labelledby={textId}
				asWrapper
			>
				<Typography className={classes["text"]} id={textId}>
					{text}
				</Typography>
			</Link>
			<Button
				aria-label="Close campaign"
				className={classes["button"]}
				onPress={() => {
					window.localStorage.setItem(
						"closed-campaign",
						campaign.link
					);
					setShowCampaign(false);
				}}
			>
				<Icon variant="x-mark" />
			</Button>
		</div>
	) : null;
};

export default Campaign;
