import { clsx } from "clsx";
import { motion } from "framer-motion";
import React from "react";

interface Props {
	title: "QUIT" | "NEXT ROUND" | "NO, CANCEL" | "YES, RESTART";
	isPrimary: boolean;
	handleClick: () => void;
}

const ModalDefault: React.FC<Props> = ({ title, handleClick, isPrimary }) => {
	const animation = {
		initial: {
			backgroundColor: isPrimary ? "#A8BFC9" : "#F2B137",
		},
		whileTap: {
			transform: "translateY(0.4rem)",
			boxShadow: [
				`inset 0rem -0.4rem 0rem ${isPrimary ? "#6B8997" : "#CC8B13"}`,
				`inset 0rem 0rem 0rem ${isPrimary ? "#6B8997" : "#CC8B13"}`,
			],
		},
		whileHover: {
			backgroundColor: isPrimary ? "#DBE8ED" : "#FFC860",
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
          w-fit h-[5.2rem]
          p-[1.7rem]
          rounded-[1rem]
          flex items-center justify-center
          ${
						isPrimary
							? "shadow-[inset_0rem_-0.4rem_0rem_#6B8997]"
							: "shadow-[inset_0rem_-0.4rem_0rem_#CC8B13]"
					}
        `
			)}
		>
			<h3 className={clsx("text-heading-xs text-primary-text-100")}>{title}</h3>,
		</motion.button>
	);
};

export default ModalDefault;
