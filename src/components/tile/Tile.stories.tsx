import { StoryObj, Meta } from "@storybook/react";
import Tile from ".";

const meta: Meta<typeof Tile> = {
	title: "components/Tile",
	component: Tile,
	argTypes: {
		tileID: {
			type: "number",
		},
	},
	tags: ["docs"],
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const Primary: Story = {
	args: {
		tileID: 1,
	},
};
