import type { Meta, StoryObj } from "@storybook/react";
import MarkToggle from ".";

/* 
	WILL NEED TO REMOUNT (REFRESH TOOL IN STORYBOOK) WHEN TOGGLING STATES, WORKS AS INTENDED IN DEV ENV
*/

const meta: Meta<typeof MarkToggle> = {
	title: "components/buttons/MarkToggle",
	component: MarkToggle,
	argTypes: {
		markToggleActive: {
			control: { type: "boolean" },
		},
		isMarkX: {
			control: { type: "boolean" },
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkToggle>;

export const Primary: Story = {
	args: {
		markToggleActive: false,
		isMarkX: false,
	},
};
