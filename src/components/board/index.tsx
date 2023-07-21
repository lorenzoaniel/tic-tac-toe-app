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
import type TileStatus from "@/interfaces/tileStatus";

const Board: React.FC = () => {
	//SELECTORS
	let selector = {
		gameModalState: useStore((state: Store) => state.mainData.gameModal),
		scoreState: useStore((state: Store) => state.mainData.score),
		playerTypeMarkState: {
			player1: useStore((state: Store) => state.mainData.player1.markTypeX),
			opponent: useStore((state: Store) => state.mainData.opponent.markTypeX),
		},
		player1: useStore((state: Store) => state.mainData.player1),
		playersInPlayState: {
			player1: useStore((state: Store) => state.mainData.player1.players),
			opponent: useStore((state: Store) => state.mainData.opponent.players),
		},
		isXTurnState: useStore((state: Store) => state.mainData.isXTurn),
		tilesState: useStore((state: Store) => state.mainData.tiles),
	};

	//DISPATCH
	let dispatch = {
		handleRestart: useStore((state: Store) => state.setModalType),
		setTile: useStore((state: Store) => state.setTile),
	};

	//TODO: replace with state data
	const createTiles = () => {
		let tileData: TileStatus = {
			isMarkSelected: false,
			isPlayer1Tile: false,
			isMarkX: true,
			tileID: 0,
			pos: { x: 0, y: 0 },
		};

		return Array(9)
			.fill(0)
			.map(async (_, index) => {
				await dispatch.setTile({
					...tileData,
					tileID: index + 1,
				});

				return (
					<Tile
						tileStatusProp={{ ...tileData }}
						handleClick={() => {
							dispatch.setTile({
								isMarkSelected: true,
								isPlayer1Tile: selector.isXTurnState === selector.player1.markTypeX,
								isMarkX: true, // relies on isXTurn
								tileID: 0,
								pos: { x: 0, y: 0 },
							});
						}}
					/>
				);
			});
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
				<TurnDisplay isTurnX={selector.isXTurnState} />
				<Restart handleClick={() => dispatch.handleRestart("restartActive", true)} />

				{createTiles()}

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

export default Board;
