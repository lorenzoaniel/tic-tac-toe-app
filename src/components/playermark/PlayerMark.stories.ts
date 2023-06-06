import type { Meta, StoryObj } from "@storybook/react";
import PlayerMark from ".";

const meta: Meta<typeof PlayerMark> = {
	title: "components/PlayerMark",
	component: PlayerMark,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlayerMark>;

export const Primary: Story = {};
