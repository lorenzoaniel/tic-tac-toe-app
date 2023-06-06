import type { Meta, StoryObj } from "@storybook/react";
import DefaultBtn from ".";

const meta: Meta<typeof DefaultBtn> = {
	title: "components/DefaultBtn",
	component: DefaultBtn,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DefaultBtn>;

export const Primary: Story = {};
