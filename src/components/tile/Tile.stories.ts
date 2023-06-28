import { StoryObj, Meta } from "@storybook/react";
import Tile from ".";

const meta: Meta<typeof Tile> = {
	title: "components/Tile",
	component: Tile,
	argTypes: {
		tileStatus: {
			defaultValue: {
				isMarkSelected: false,
				tileID: 0,
				isMarkX: true,
			},
		},
	},
	tags: ["docs"],
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const NoMarkX: Story = {
	args: {
		tileStatus: {
			isMarkSelected: false,
			tileID: 0,
			isMarkX: true,
		},
	},
};

export const NoMarkO: Story = {
	args: {
		tileStatus: {
			isMarkSelected: false,
			tileID: 0,
			isMarkX: false,
		},
	},
};

export const XMark: Story = {
	args: {
		tileStatus: {
			isMarkSelected: true,
			tileID: 0,
			isMarkX: true,
		},
	},
};

export const OMark: Story = {
	args: {
		tileStatus: {
			isMarkSelected: true,
			tileID: 0,
			isMarkX: false,
		},
	},
};
