import { StoryObj, Meta } from "@storybook/react";
import StatDisplay from ".";

const meta: Meta<typeof StatDisplay> = {
	title: "components/displays/StatDisplay",
	component: StatDisplay,
	tags: ["docs"],
	argTypes: {
		playerIdentity: {
			control: { type: "object" },
			defaultValue: { player1: false, player2: false, playercpu: false }, // set default values
		},
		score: {
			control: { type: "number" },
		},
	},
};

export default meta;
type Story = StoryObj<typeof StatDisplay>;

export const Player1: Story = {
	args: {
		playerIdentity: { player1: true, player2: false, playercpu: false },
		score: 14,
	},
};

export const Player2: Story = {
	args: {
		playerIdentity: { player1: false, player2: true, playercpu: false },
		score: 11,
	},
};

export const PlayerCpu: Story = {
	args: {
		playerIdentity: { player1: false, player2: false, playercpu: true },
		score: 11,
	},
};

export const Tie: Story = {
	args: {
		playerIdentity: { player1: false, player2: false, playercpu: false },
		isTie: true,
		score: 32,
	},
};
