import { StoryObj, Meta } from "@storybook/react";
import Board from ".";

const meta: Meta<typeof Board> = {
	title: "components/Board",
	component: Board,
	tags: ["docs"],
};

export default meta;
type Story = StoryObj<typeof Board>;

export const Primary = {};
