import { StoryObj, Meta } from "@storybook/react";
import TurnDisplay from ".";

const meta: Meta<typeof TurnDisplay> = {
	title: "components/displays/TurnDisplay",
	component: TurnDisplay,
	argTypes: {
		isTurnX: {
			control: {
				type: "boolean",
			},
		},
	},
	tags: ["docs"],
};

export default meta;
type Story = StoryObj<typeof TurnDisplay>;

export const Primary: Story = {
	args: {
		isTurnX: true,
	},
};
