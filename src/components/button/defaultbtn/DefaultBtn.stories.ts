import type { Meta, StoryObj } from "@storybook/react";
import DefaultBtn from ".";

const meta: Meta<typeof DefaultBtn> = {
	title: "components/DefaultBtn",
	component: DefaultBtn,
	argTypes: {
		btntype: {
			options: ["marktoggle", "test", "newgame", "restart"],
			control: { type: "select" },
		},
		markToggleActive: {
			control: { type: "boolean" },
			if: { arg: "btntype", eq: "marktoggle" },
		},
		isMarkX: {
			control: { type: "boolean" },
			if: { arg: "btntype", eq: "marktoggle" },
		},
		title: {
			control: { type: "select" },
			options: ["NEW GAME (VS CPU)", "NEW GAME (VS PLAYER)"],
		},
		isPrimary: {
			control: { type: "boolean" },
			if: { arg: "btntype", eq: "newgame" },
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DefaultBtn>;

export const Primary: Story = {
	args: {
		btntype: "marktoggle",
		markToggleActive: false,
		isMarkX: false,
		title: "",
		isPrimary: true,
	},
};
