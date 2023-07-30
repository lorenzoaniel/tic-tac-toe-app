// import { PlayerIdentity } from '@/interfaces/playeridentity';
import { StoryObj, Meta } from "@storybook/react";
import StatDisplay from ".";

const meta: Meta<typeof StatDisplay> = {
	title: "components/displays/StatDisplay",
	component: StatDisplay,
	tags: ["docs"],
	argTypes: {
		playersInPlay: {
			control: { type: "object" },
			defaultValue: { player1: false, player2: false, playercpu: false }, // set default values
		},
		markTypeIsX: {
			control: {
				type: "boolean",
			},
		},
		isTie: {
			control: {
				type: "boolean",
			},
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
		playersInPlay: { player1: true, player2: false, playercpu: false },
		markTypeIsX: true,
		score: 14,
	},
};

export const Player2: Story = {
	args: {
		playersInPlay: { player1: false, player2: true, playercpu: false },
		markTypeIsX: false,
		score: 11,
	},
};

export const PlayerCpu: Story = {
	args: {
		playersInPlay: { player1: false, player2: false, playercpu: true },
		markTypeIsX: false,
		score: 11,
	},
};

export const Tie: Story = {
	args: {
		playersInPlay: { player1: false, player2: false, playercpu: false },
		isTie: true,
		score: 32,
	},
};
