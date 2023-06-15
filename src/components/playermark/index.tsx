import clsx from "clsx";
import React, { useState } from "react";
import MarkToggle from "../button/marktoggle";

interface Props {
	markToggleActive: boolean;
}

const PlayerMark: React.FC<Props> = ({ markToggleActive }) => {
	const [testState, setTestState] = useState(false);
	const title = "PICK PLAYER 1'S MARK";
	const reminder = "REMEMBER : X GOES FIRST";

	return (
		<div
			className={clsx(
				"player-mark",
				"w-[32.7rem] h-[20.5rem] rounded-[1.5rem] p-[2.4rem]",
				"bg-primary-bg-200 shadow-[inset_0rem_-0.8rem_0rem_#10212A]",
				"flex flex-col items-center justify-around",
				"md:w-[46rem]"
			)}
		>
			<h1 className={clsx("player-mark-title", "text-heading-xs text-secondary-text-300")}>
				{title}
			</h1>
			<div
				className={clsx(
					"marktogglebtn",
					"h-[7.2rem] w-[27.9rem] bg-primary-bg-100 rounded-[1rem]",
					"flex justify-center items-center",
					"md:w-[41.2rem]"
				)}
			>
				<MarkToggle
					markToggleActive={testState}
					isMarkX={true}
					handleClick={() => {
						setTestState(true);
					}}
				/>
				<MarkToggle
					markToggleActive={testState}
					isMarkX={false}
					handleClick={() => {
						setTestState(false);
					}}
				/>
			</div>
			<h2 className={clsx("player-mark-title", "text-body text-secondary-text-300 opacity-50")}>
				{reminder}
			</h2>
		</div>
	);
};

export default PlayerMark;
