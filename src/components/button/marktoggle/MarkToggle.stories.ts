import type { Meta, StoryObj } from "@storybook/react";
import MarkToggle from ".";

const meta: Meta<typeof MarkToggle> = {
	title: "components/MarkToggle",
	component: MarkToggle,
	argTypes: { markToggleActive: { control: { type: "boolean" } } },
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkToggle>;

export const Primary: Story = {
	args: {
		markToggleActive: true,
	},
};
