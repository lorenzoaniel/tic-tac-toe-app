"use client";

import clsx from "clsx";
import React from "react";
import Logo from "../logo";
import PlayerMark from "../playermark";
import NewGame from "../button/newgame";

const Menu: React.FC = () => {
	//TODO: add statemanagement no Props for this one

	return (
		<section
			className={clsx(
				"menu",
				"h-[42.9rem] w-[32.7rem]",
				"bg-transparent",
				"flex flex-col items-center justify-between",
				"md:h-[47.1rem] md:w-[46rem]"
			)}
		>
			<Logo />
			<PlayerMark markToggleActive={false} />
			<NewGame
				isPrimary={false}
				handleClick={function () {
					throw new Error("Function not implemented.");
				}}
				newGameIsCpu={true}
			/>
			<NewGame
				isPrimary={true}
				handleClick={function () {
					throw new Error("Function not implemented.");
				}}
				newGameIsCpu={false}
			/>
		</section>
	);
};

export default Menu;
