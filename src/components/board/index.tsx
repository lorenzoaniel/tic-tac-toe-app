"use client";

import clsx from "clsx";
import React from "react";
import Logo from "../logo";
import TurnDisplay from "../display/turn";
import Restart from "../button/restart";
import Tile from "../tile";
import StatDisplay from "../display/stat";
import { useStore } from "@/state/useStore";
import type { Store } from "@/interfaces/store";
import Modal from "../modal";

const Board: React.FC = () => {
	//SELECTORS
	let selector = {
		gameModalState: useStore((state: Store) => state.mainData.gameModal),
		scoreState: useStore((state: Store) => state.mainData.score),
		playerTypeMarkState: {
			player1: useStore((state: Store) => state.mainData.player1.markTypeX),
			opponent: useStore((state: Store) => state.mainData.opponent.markTypeX),
		},
		playersInPlayState: {
			player1: useStore((state: Store) => state.mainData.player1.players),
			opponent: useStore((state: Store) => state.mainData.opponent.players),
		},
		isXTurnState: useStore((state: Store) => state.mainData.isXTurn),
	};

	//DISPATCH
	let dispatch = {
		handleRestart: useStore((state: Store) => state.setModalType),
	};

	// prevents memory leak from calling this unlimited times
	// relies on local state in tile component to rerender itself
	const createTiles = React.useMemo(() => {
		return Array(9)
			.fill(0)
			.map((_, index) => {
				return (
					<Tile
						key={"tileComp" + index}
						// initially tiles are already set, simply grabs its profile from created tile state in store
						tileID={index + 1}
					/>
				);
			});
	}, []);

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
				<TurnDisplay isTurnX={selector.isXTurnState} />
				<Restart handleClick={() => dispatch.handleRestart("restartActive", true)} />

				{createTiles}

				<StatDisplay
					playersInPlay={selector.playersInPlayState.player1}
					score={selector.scoreState.player1}
					markTypeIsX={selector.playerTypeMarkState.player1}
				/>
				<StatDisplay score={selector.scoreState.ties} isTie={true} />
				<StatDisplay
					playersInPlay={selector.playersInPlayState.opponent}
					score={selector.scoreState.opponent}
					markTypeIsX={selector.playerTypeMarkState.opponent}
				/>
				{Object.values(selector.gameModalState).some((value) => value === true) && (
					<Modal modalActiveStatus={selector.gameModalState} />
				)}
			</section>
		</>
	);
};

export default React.memo(Board);
