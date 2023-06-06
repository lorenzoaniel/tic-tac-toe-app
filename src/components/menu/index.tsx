import clsx from "clsx";
import React from "react";
import Logo from "../logo";

const Menu = () => {
	return (
		<section
			className={clsx(
				"menu",
				"h-[42.9rem] w-[32.7rem] bg-black self-center justify-self-center",
				"md:h-[47.1rem] md:w-[46rem]"
			)}
		>
			<Logo />
		</section>
	);
};

export default Menu;
