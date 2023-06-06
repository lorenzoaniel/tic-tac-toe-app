import clsx from "clsx";
import React from "react";

const PlayerMark: React.FC = () => {
	const title = "PICK PLAYER 1'S MARK";

	return (
		<div
			className={clsx(
				"player-mark",
				"w-[32.7rem] h-[20.5rem] rounded-[1.5rem] p-[2.4rem]",
				"bg-primary-bg-200",
				"flex flex-col items-center justify-center",
				"md:w-[46rem]"
			)}
		>
			<h1 className={clsx("player-mark-title", "text-heading-xs text-secondary-text-300")}>
				{title}
			</h1>
		</div>
	);
};

export default PlayerMark;
