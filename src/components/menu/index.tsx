"use client";

import clsx from "clsx";
import React from "react";
import Logo from "../logo";
import PlayerMark from "../playermark";
import DefaultBtn from "../button/defaultbtn";

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
			<DefaultBtn
				btntype={"newgame"}
				isPrimary={false}
				title={"NEW GAME (VS CPU)"}
				handleClick={function () {
					throw new Error("Function not implemented.");
				}}
			/>
			<DefaultBtn
				btntype={"newgame"}
				isPrimary={true}
				title={"NEW GAME (VS PLAYER)"}
				handleClick={function () {
					throw new Error("Function not implemented.");
				}}
			/>
		</section>
	);
};

export default Menu;
