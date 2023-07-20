import PlayerIdentity from "@/interfaces/playeridentity";
import clsx from "clsx";
import React from "react";

interface Props {
	playersInPlay?: PlayerIdentity;
	markTypeIsX?: boolean | null;
	isTie?: boolean;
	score: number;
}

const generateTitle = (playersInPlay: PlayerIdentity, markTypeisX: boolean | null): string => {
	let result: string = "TIES";

	const title: { [key: string]: { [key: string]: string } } = {
		player1: {
			x: "X (P1)",
			o: "O (P1)",
		},
		player2: {
			x: "X (P2)",
			o: "O (P2)",
		},
		playercpu: {
			x: "X (CPU)",
			o: "O (CPU)",
		},
	};

	Object.entries(playersInPlay).forEach(([key, val]) => {
		//if key value is true
		if (val && markTypeisX !== null) {
			// title<playertype><if true x otherwise o>
			result = title[key][markTypeisX ? "x" : "o"];
		}
	});

	return result;
};

const StatDisplay: React.FC<Props> = ({
	playersInPlay = { player1: false, player2: false, playercpu: false },
	score,
	isTie = false,
	markTypeIsX = null,
}) => {
	//players, opponent, player1 from store

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
					"bg-primary-btn-100": playersInPlay.player1,
					"bg-secondary-btn-100": playersInPlay.player2 || playersInPlay.playercpu,
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
				{generateTitle(playersInPlay, markTypeIsX)}
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
