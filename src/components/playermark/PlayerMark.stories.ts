import type { Meta, StoryObj } from "@storybook/react";
import PlayerMark from ".";

const meta: Meta<typeof PlayerMark> = {
	title: "components/PlayerMark",
	component: PlayerMark,
	argTypes: {
		markToggleActive: {
			control: { type: "boolean" },
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlayerMark>;

export const Primary: Story = {
	args: {
		markToggleActive: false,
	},
};
