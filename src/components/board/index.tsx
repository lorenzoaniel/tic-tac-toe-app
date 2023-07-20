"use client";

import clsx from "clsx";
import React from "react";
import Logo from "../logo";
import TurnDisplay from "../display/turn";
import Restart from "../button/restart";
import Tile from "../tile";
import StatDisplay from "../display/stat";
import { useStore } from "@/state/useStore";
import { Store } from "@/interfaces/store";
import Modal from "../modal";
// import { ModalActiveStatus } from "@/interfaces/modalActiveStatus";

const Board: React.FC = () => {
	//SELECTORS
	let selector = {
		gameModalState: useStore((state: Store) => state.mainData.gameModal),
		scoreState: useStore((state: Store) => state.mainData.score),
		playerTypeMark: {
			player1: useStore((state: Store) => state.mainData.player1.markTypeX),
			opponent: useStore((state: Store) => state.mainData.opponent.markTypeX),
		},
		playersInPlay: {
			player1: useStore((state: Store) => state.mainData.player1.players),
			opponent: useStore((state: Store) => state.mainData.opponent.players),
		},
	};

	//TODO: replace with state
	const dummyDataTile = {
		isMarkSelected: false,
		tileID: 1,
		isMarkX: true,
	};

	//DISPATCH
	let dispatch = {
		handleRestart: useStore((state: Store) => state.setModalType),
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
		<>
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
				<Restart handleClick={() => dispatch.handleRestart("restartActive", true)} />

				{createTiles()}

				<StatDisplay
					playersInPlay={selector.playersInPlay.player1}
					score={selector.scoreState.player1}
					markTypeIsX={selector.playerTypeMark.player1}
				/>
				<StatDisplay score={selector.scoreState.ties} isTie={true} />
				<StatDisplay
					playersInPlay={selector.playersInPlay.opponent}
					score={selector.scoreState.opponent}
					markTypeIsX={selector.playerTypeMark.opponent}
				/>
				{Object.values(selector.gameModalState).some((value) => value === true) && (
					<Modal modalActiveStatus={selector.gameModalState} />
				)}
			</section>
		</>
	);
};

export default Board;
