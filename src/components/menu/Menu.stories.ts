import type { Meta, StoryObj } from "@storybook/react";
import Menu from ".";

const meta: Meta<typeof Menu> = {
	title: "components/Menu",
	component: Menu,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Primary: Story = {};

export const ModalActive: Story = {};
