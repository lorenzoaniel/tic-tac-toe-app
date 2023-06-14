import { clsx } from "clsx";
import { motion } from "framer-motion";
import React from "react";

interface Props {
	isPrimary: boolean;
	handleClick: () => void;
	newGameIsCpu: boolean;
}

const NewGame: React.FC<Props> = ({ isPrimary, handleClick, newGameIsCpu }) => {
	const animation = {
		whileTap: {
			transform: "translateY(0.8rem)",
			boxShadow: [
				`inset 0rem -0.8rem 0rem ${isPrimary ? "#118C87" : "#CC8B13"}`,
				`inset 0rem 0rem 0rem ${isPrimary ? "#118C87" : "#CC8B13"}`,
			],
			backgroundColor: isPrimary ? "#31C3BD" : "#F2B137",
		},
		whileHover: {
			backgroundColor: isPrimary ? "#65E9E4" : "#FFC860",
		},
	};

	const motionProps = {
		initial: "initial",
		whileTap: "whileTap",
		whileHover: "whileHover",
	};

	return (
		<motion.button
			{...motionProps}
			variants={animation}
			onClick={handleClick}
			className={clsx(
				"defaultbtn",
				`
          h-[5.6rem] w-[32.7rem]
          flex justify-center
          rounded-[1.5rem]

          ${isPrimary ? "bg-primary-btn-100" : "bg-secondary-btn-100"}
          
          ${
						isPrimary
							? "shadow-[inset_0rem_-0.8rem_0rem_#118C87]"
							: "shadow-[inset_0rem_-0.8rem_0rem_#CC8B13]"
					}

          md:h-[6.7rem] md:w-[46rem]
        `
			)}
		>
			<h3
				className={clsx(
					"newgame-title",
					"mt-[1.4rem]",
					"text-heading-xs text-primary-text-100",
					"md:mt-[1.7rem]",
					"md:text-heading-s"
				)}
			>
				{newGameIsCpu ? "NEW GAME (VS CPU)" : "NEW GAME (VS PLAYER)"}
			</h3>
		</motion.button>
	);
};

export default NewGame;
