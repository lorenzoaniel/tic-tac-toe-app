import type { Meta, StoryObj } from "@storybook/react";
import ModalDefault from ".";

/* 
	WILL NEED TO REMOUNT (REFRESH TOOL IN STORYBOOK) WHEN TOGGLING STATES, WORKS AS INTENDED IN DEV ENV
*/

const meta: Meta<typeof ModalDefault> = {
	title: "components/buttons/ModalDefault",
	component: ModalDefault,
	argTypes: {
		title: {
			control: { type: "select" },
			options: ["QUIT", "NEXT ROUND", "NO, CANCEL", "YES, RESTART"],
		},
		isPrimary: {
			control: { type: "boolean" },
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalDefault>;

export const Primary: Story = {
	args: {
		title: "QUIT",
		isPrimary: true,
	},
};
