import { useId, useRef } from "react";
import { useButton } from "react-aria";
import { useRouter } from "next/router";

import Heading from "components/Heading";
import MetaData from "components/MetaData";

import classes from "styles/pages/LoginPage.module.scss";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG();

const LoginPage = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const id = useId();

	const { buttonProps } = useButton(
		{
			onPress: () => {
				if (inputRef.current) {
					document.cookie = `password=${inputRef.current?.value}`;
					router.push("/");
				}
			},
		},
		buttonRef
	);

	const router = useRouter();

	return (
		<main className={classes["container"]}>
			<MetaData title="Login" noindex />
			<div className={classes["form"]}>
				<input
					type="password"
					name="password"
					id={id}
					className={classes["password"]}
					ref={inputRef}
					placeholder="Sup3rS3cr3tP4ssw0rd!"
				/>
				<button {...buttonProps} className={classes["button"]}>
					<Heading type="b" look="h6" color="background">
						LOGIN
					</Heading>
				</button>
			</div>
		</main>
	);
};

export default LoginPage;
