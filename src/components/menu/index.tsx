import clsx from "clsx";
import React from "react";
import Logo from "../logo";

const Menu = () => {
	return (
		<section
			className={clsx("menu", "h-[42.9rem] w-[32.7rem] bg-black self-center justify-self-center")}
		>
			<Logo />
		</section>
	);
};

export default Menu;
