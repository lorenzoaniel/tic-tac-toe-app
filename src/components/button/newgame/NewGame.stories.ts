import type { Meta, StoryObj } from "@storybook/react";
import NewGame from ".";

/* 
	WILL NEED TO REMOUNT (REFRESH TOOL IN STORYBOOK) WHEN TOGGLING STATES, WORKS AS INTENDED IN DEV ENV
*/

const meta: Meta<typeof NewGame> = {
	title: "components/buttons/NewGame",
	component: NewGame,
	argTypes: {
		isPrimary: {
			control: { type: "boolean" },
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NewGame>;

export const Primary: Story = {
	args: {
		isPrimary: true,
	},
};
