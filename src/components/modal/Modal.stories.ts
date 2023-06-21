import { StoryObj, Meta } from "@storybook/react";
import Modal from ".";

const meta: Meta<typeof Modal> = {
	title: "components/Modal",
	component: Modal,
	argTypes: {
		modalActiveStatus: {
			control: { type: "object" },
			defaultValue: {
				winActive: false,
				lostActive: false,
				restartActive: false,
				tiedActive: false,
			}, // set default values
		},
	},
	tags: ["docs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const WinActive: Story = {
	args: {
		modalActiveStatus: {
			winActive: true,
			lostActive: false,
			restartActive: false,
			tiedActive: false,
		},
	},
};

export const LoseActive: Story = {
	args: {
		modalActiveStatus: {
			winActive: false,
			lostActive: true,
			restartActive: false,
			tiedActive: false,
		},
	},
};

export const ResetActive: Story = {
	args: {
		modalActiveStatus: {
			winActive: false,
			lostActive: false,
			restartActive: true,
			tiedActive: false,
		},
	},
};

export const TiedActive: Story = {
	args: {
		modalActiveStatus: {
			winActive: false,
			lostActive: false,
			restartActive: false,
			tiedActive: true,
		},
	},
};
