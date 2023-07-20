"use client";

import clsx from "clsx";
import React from "react";
import Logo from "../logo";
import PlayerMark from "../playermark";
import NewGame from "../button/newgame";
import { useStore } from "@/state/useStore";
import { Store } from "@/interfaces/store";

const Menu: React.FC = () => {
	//SELECTORS
	let selector = {
		playerTypeMark: {
			player1: useStore((state: Store) => state.mainData.player1.markTypeX),
			opponent: useStore((state: Store) => state.mainData.opponent.markTypeX),
		},
	};

	//DISPATCH
	let dispatch = {
		setMarkType: useStore((state: Store) => state.setMarkType),
		setMenuState: useStore((state: Store) => state.setMenuState),
		setOpponentType: useStore((state: Store) => state.setOpponentType),
	};

	return (
		<section
			className={clsx(
				"menu",
				`
					h-[42.9rem] w-[32.7rem]",
					bg-transparent
					flex flex-col items-center justify-between
				`,
				`
					md:h-[47.1rem] md:w-[46rem]
				`
			)}
		>
			<Logo />
			{/* PICK PLAYER 1'S MARK */}
			<PlayerMark
				markToggleActive={selector.playerTypeMark.player1}
				handleClick={() => {
					/* 
						passes the opposite value of player1 which will reflect
						in markToggleActive and activate button toggle effect 
					*/
					dispatch.setMarkType(!selector.playerTypeMark.player1);
				}}
			/>
			{/* NEW GAME (VS CPU) */}
			<NewGame
				isPrimary={false}
				handleClick={() => {
					/* 
						basically sets opponent type to cpu and false for p2
						after which it changes the menu state so that Board component will be
						displayed instead
					*/
					dispatch.setOpponentType("playercpu", true);
					dispatch.setOpponentType("player2", false);
					dispatch.setMenuState(false);
				}}
				newGameIsCpu={true}
			/>
			{/* NEW GAME (VS PLAYER) */}
			<NewGame
				isPrimary={true}
				handleClick={() => {
					/* same as new game CPU but viceversa */
					dispatch.setOpponentType("playercpu", false);
					dispatch.setOpponentType("player2", true);
					dispatch.setMenuState(false);
				}}
				newGameIsCpu={false}
			/>
		</section>
	);
};

export default Menu;
