"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/state/useStore";
import { Store } from "@/interfaces/store";

interface Props {
	tileID: number;
}

const Tile: React.FC<Props> = ({ tileID }) => {
	const [tileIDState, _] = useState(tileID);

	const selector = {
		tileState: useStore((state: Store) => state.mainData.tiles[tileIDState]),
		isXTurnState: useStore((state: Store) => state.mainData.isXTurn),
		playerTypeMarkState: {
			player1: useStore((state: Store) => state.mainData.player1.markTypeX),
			opponent: useStore((state: Store) => state.mainData.opponent.markTypeX),
		},
		gameModal: useStore((state: Store) => state.mainData.gameModal),
		players: {
			player1: useStore((state: Store) => state.mainData.player1),
			opponent: useStore((state: Store) => state.mainData.opponent),
		},
	};

	const dispatch = {
		setTile: useStore((state: Store) => state.setTile),
		setTurn: useStore((state: Store) => state.setTurn),
		checkTilesForWinner: useStore((state: Store) => state.checkTilesForWinner),
	};

	const animated = {
		tile: {
			whileHover: {},
		},
		svgOutline: {
			initial: {
				display: "none",
			},
			whileHover: {
				display: "inline",
			},
		},
	};

	const motionProps = {
		tile: {
			whileHover: "whileHover",
		},
		svgOutline: {
			initial: animated.svgOutline.initial, // being orchestrated by parent component so cant be string
			whileHover: animated.svgOutline.whileHover, // being orchestrated by parent component so cant be string
		},
	};

	// // if playing with cpu
	// if (
	// 	selector.players.opponent.players.playercpu &&
	// 	!selector.isXTurnState === selector.playerTypeMarkState.player1
	// ) {
	// 	dispatch.cpuMove();
	// 	if (!Object.values(selector.gameModal).some((value) => value === true)) {
	// 		dispatch.setTurn(!selector.isXTurnState);
	// 	}
	// }

	return (
		<motion.div
			{...motionProps.tile}
			onClick={() => {
				// logic that prevents setting tile info if tile already occupied
				if (!selector.tileState.isMarkSelected) {
					// if tile not occupied set new tile info, the styling will be reflected via
					// looking at the specific tile state after change
					dispatch.setTile(tileIDState, {
						...selector.tileState,
						// converted to true since it is selected when clicked
						isMarkSelected: true,
						// compares current turn Mark with player1 mark type and returns result boolean
						isPlayer1Tile:
							selector.isXTurnState === selector.playerTypeMarkState.player1 ? true : false,
						// relies on isXTurn
						isMarkX: selector.isXTurnState,
					});
					// check tile for winner everytime a tile is selected
					dispatch.checkTilesForWinner(
						selector.isXTurnState === selector.playerTypeMarkState.player1 ? "player1" : "opponent"
					);

					if (!Object.values(selector.gameModal).some((value) => value === true)) {
						dispatch.setTurn(!selector.isXTurnState);
					}
					// when finished setting tile new info change turn
				}
			}}
			variants={animated.tile}
			className={clsx(
				`Tile-${tileIDState}`,
				`
          h-[9.6rem] w-[9.6rem]
          bg-primary-bg-200
          rounded-[1rem] shadow-[inset_0rem_-0.8rem_0rem_#10212A]
          flex justify-center items-center

					md:h-[14rem] md:w-[14rem]
        `
			)}
		>
			{/* 
				This portion will rely on the tile state stored in store
				any change when tile is clicked will be sent to store and in turn
				any logic that uses certain states for that particular tile
				will be reflected here for styling logic and conditions

				breakdown is as follows:
				checks whether tile has been selected
				if not enable hover if it is selected show the solid mark shape
			*/}
			{selector.tileState.isMarkSelected ? (
				selector.tileState.isMarkX ? (
					<svg
						className="md:h-[6.4rem] md:w-[6.4rem]"
						width="40"
						height="40"
						viewBox="0 0 64 64"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
							fill="#31C3BD"
							fillRule="evenodd"
						/>
					</svg>
				) : (
					<svg
						className="md:h-[6.4rem] md:w-[6.4rem]"
						width="40"
						height="40"
						viewBox="0 0 64 64"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
							fill="#F2B137"
						/>
					</svg>
				)
			) : selector.isXTurnState ? (
				<motion.svg
					{...motionProps.svgOutline}
					variants={animated.svgOutline}
					className="md:h-[6.4rem] md:w-[6.4rem]"
					width="40"
					height="40"
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z"
						stroke="#31C3BD"
						strokeWidth="2"
						fill="none"
					/>
				</motion.svg>
			) : (
				<motion.svg
					{...motionProps.svgOutline}
					variants={animated.svgOutline}
					className="md:h-[6.4rem] md:w-[6.4rem]"
					width="40"
					height="40"
					viewBox="0 0 66 66"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
						stroke="#F2B137"
						strokeWidth="2"
						fill="none"
					/>
				</motion.svg>
			)}
		</motion.div>
	);
};

export default Tile;
