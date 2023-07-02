import PlayerIdentity from "@/interfaces/playeridentity";
import clsx from "clsx";
import React from "react";

interface Props {
	playerIdentity: PlayerIdentity;
	score: number;
	isTie: boolean;
}

const StatDisplay: React.FC<Props> = ({ playerIdentity, score, isTie }) => {
	return (
		<div
			className={clsx(
				"statdisplay",
				`
          h-[6.4rem] w-[9.6rem]
          flex flex-col justify-center items-center
          rounded-[1rem]

					md:h-[7.2rem] md:w-[14rem]
        `,
				{
					"bg-primary-btn-100": playerIdentity.player1,
					"bg-secondary-btn-100": playerIdentity.player2 || playerIdentity.playercpu,
					"bg-secondary-btn-300": isTie,
				}
			)}
		>
			<h3
				className={clsx(
					"statdisplay-title",
					`
            h-fit w-fit
            text-body text-primary-text-100
          `
				)}
			>
				{playerIdentity.player1
					? "X (YOU)"
					: playerIdentity.player2
					? "O (P2)"
					: playerIdentity.playercpu
					? "O (CPU)"
					: "TIES"}
			</h3>
			<h2
				className={clsx(
					"statdisplay-value",
					`
            text-heading-s text-primary-text-100
          `
				)}
			>
				{score}
			</h2>
		</div>
	);
};

export default StatDisplay;
