import type { Meta, StoryObj } from "@storybook/react";
import MarkToggle from ".";

const meta: Meta<typeof MarkToggle> = {
	title: "components/MarkToggle",
	component: MarkToggle,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkToggle>;

export const Primary: Story = {};
