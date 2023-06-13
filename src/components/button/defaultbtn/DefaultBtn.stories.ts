import type { Meta, StoryObj } from "@storybook/react";
import DefaultBtn from ".";

const meta: Meta<typeof DefaultBtn> = {
	title: "components/DefaultBtn",
	component: DefaultBtn,
	argTypes: {
		btntype: {
			options: ["marktoggle", "newgame", "restart", "modaldefault"],
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
			options: [
				"NEW GAME (VS CPU)",
				"NEW GAME (VS PLAYER)",
				"QUIT",
				"NEXT ROUND",
				"NO, CANCEL",
				"YES, RESTART",
			],
		},
		isPrimary: {
			control: { type: "boolean" },
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
