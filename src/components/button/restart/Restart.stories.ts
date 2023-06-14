import type { Meta, StoryObj } from "@storybook/react";
import Restart from ".";

/* 
	WILL NEED TO REMOUNT (REFRESH TOOL IN STORYBOOK) WHEN TOGGLING STATES, WORKS AS INTENDED IN DEV ENV
*/

const meta: Meta<typeof Restart> = {
	title: "components/buttons/Restart",
	component: Restart,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Restart>;

export const Primary: Story = {};
