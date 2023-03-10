import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Modal from "./Modal";

export default {
	component: Modal,
	title: "Modal",
} as ComponentMeta<typeof Modal>;

export const Primary: ComponentStory<typeof Modal> = (props) => (
	<Modal {...props} />
);
