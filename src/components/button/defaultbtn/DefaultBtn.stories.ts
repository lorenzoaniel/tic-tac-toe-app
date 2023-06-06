import type { Meta, StoryObj } from "@storybook/react";
import DefaultBtn from ".";

const meta: Meta<typeof DefaultBtn> = {
	title: "components/DefaultBtn",
	component: DefaultBtn,
	argTypes: {
		btntype: {
			options: ["marktoggle", "secondary"],
			control: { type: "select" },
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DefaultBtn>;

export const Primary: Story = {
	args: {
		btntype: "marktoggle",
	},
};
