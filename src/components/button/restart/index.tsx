import { clsx } from "clsx";
import { motion } from "framer-motion";
import React from "react";

const Restart: React.FC = () => {
	//TODO: add dispatch for reset

	const animation = {
		initial: {
			backgroundColor: "#A8BFC9",
		},
		whileTap: {
			boxShadow: ["inset 0rem -0.4rem 0rem #6B8997", "inset 0rem 0rem 0rem #6B8997"],
			backgroundColor: "#A8BFC9",
			transform: "translateY(0.4rem)",
		},
		whileHover: {
			backgroundColor: "#DBE8ED",
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
			onClick={() => {}}
			className={clsx(
				"defaultbtn",
				`
          h-[4rem] w-[4rem]
          rounded-[0.5rem]
          shadow-[inset_0rem_-0.4rem_0rem_#6B8997]
          flex justify-center items-center

          md:h-[5.2rem] md:w-[5.2rem]
        `
			)}
		>
			<svg
				className={clsx("md:w-[2rem] md:h-[2rem]")}
				width="15"
				height="15"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z"
					fill="#1F3641"
				/>
			</svg>
		</motion.button>
	);
};

export default Restart;