"use client";

import clsx from "clsx";
import React from "react";
import Logo from "../logo";
import TurnDisplay from "../display/turn";
import Restart from "../button/restart";
import Tile from "../tile";
import StatDisplay from "../display/stat";

const Board: React.FC = () => {
	//TODO: replace with state
	const dummyDataTile = {
		isMarkSelected: false,
		tileID: 1,
		isMarkX: true,
	};

	//TODO: replace with state
	const dummyDataStat = {
		p1X: {
			player1: true,
			player2: false,
			playercpu: false,
		},
		ties: {
			player1: false,
			player2: false,
			playercpu: false,
		},
		pCpuX: {
			player1: false,
			player2: false,
			playercpu: true,
		},
	};

	//TODO: replace with state data
	const createTiles = () => {
		return Array(9)
			.fill(0)
			.map(() => (
				<Tile
					tileStatus={dummyDataTile}
					handleClick={function (): void {
						throw new Error("Function not implemented.");
					}}
				/>
			));
	};

	return (
		<section
			className={clsx(
				"board",
				`
          h-[51.6rem] w-[32.8rem]
          grid grid-cols-3 grid-flow-rows
          justify-items-center items-center

          md:h-[62.3rem] md:w-[46rem]
        `
			)}
		>
			<Logo variant="board" />
			<TurnDisplay isTurnX={false} />
			<Restart />

			{createTiles()}

			<StatDisplay playerIdentity={dummyDataStat.p1X} score={14} isTie={false} />
			<StatDisplay playerIdentity={dummyDataStat.ties} score={32} isTie={true} />
			<StatDisplay playerIdentity={dummyDataStat.pCpuX} score={11} isTie={false} />
		</section>
	);
};

export default Board;
