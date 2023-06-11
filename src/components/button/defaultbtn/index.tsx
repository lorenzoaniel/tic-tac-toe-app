import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

interface Props {
	btntype: "marktoggle" | "newgame" | "restart";
	markToggleActive?: boolean; //only used when btntype is marktoggle
	isMarkX?: boolean; //only used when btntype is marktoggle
	title?: string;
	isPrimary?: boolean;
	onClick: () => any;
}

//TODO: need framer animation

const DefaultBtn: React.FC<Props> = ({
	btntype,
	markToggleActive,
	isMarkX,
	onClick,
	title,
	isPrimary,
}) => {
	/* relies on btntype to construct any other element/s present for that type*/
	const structure: { [key: string]: JSX.Element } = {
		marktoggle: isMarkX ? (
			//X-Icon
			<svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
					fill={markToggleActive ? "#1A2A33" : "#A8A8A8"}
					fill-rule="evenodd"
				/>
			</svg>
		) : (
			//O-Icon
			<svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
					fill={markToggleActive ? "#A8A8A8" : "#1A2A33"}
				/>
			</svg>
		),
		newgame: (
			<h3
				className={clsx(
					"newgame-title",
					"mt-[1.4rem]",
					"text-heading-xs text-primary-text-100",
					"md:mt-[1.7rem]",
					"md:text-heading-s"
				)}
			>
				{title}
			</h3>
		),
		restart: (
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
		),
	};

	/* custom stying for each btntype*/
	const styling: { [key: string]: string } = {
		test: `
			h-[5.4rem] w-[13.199rem] bg-secondary-btn-100
		`,
		marktoggle: `
			h-[5.4rem] w-[13.199rem]
			${
				markToggleActive
					? isMarkX
						? "bg-secondary-btn-300"
						: "bg-transparent hover:bg-[#A8BFC90D]"
					: isMarkX
					? "bg-transparent hover:bg-[#A8BFC90D]"
					: "bg-secondary-btn-300"
			}
			rounded-[1rem]
			flex justify-center items-center

			md:w-[19.8rem]
		`,
		newgame: `
			h-[5.6rem] w-[32.7rem]
			flex justify-center
			${
				isPrimary
					? "bg-primary-btn-100 hover:bg-primary-btn-200"
					: "bg-secondary-btn-100 hover:bg-secondary-btn-200"
			}
			rounded-[1.5rem]
			${
				isPrimary
					? "shadow-[inset_0rem_-0.8rem_0rem_#118C87]"
					: "shadow-[inset_0rem_-0.8rem_0rem_#CC8B13]"
			}
			

			md:h-[6.7rem] md:w-[46rem]
		`,
		restart: `
		h-[4rem] w-[4rem]
		bg-secondary-btn-300
		rounded-[0.5rem]
		shadow-[inset_0rem_-0.4rem_0rem_#6B8997]
		flex justify-center items-center

		hover:bg-secondary-btn-400

		md:h-[5.2rem] md:w-[5.2rem]
		`,
	};

	/* custom framer-motion animation for each btntype*/
	const animation: { [key: string]: {} } = {
		marktoggle: {
			onToggleStateChange: markToggleActive
				? isMarkX
					? { opacity: [1, 0.5, 1] }
					: { opacity: [0, 0.5, 1] }
				: isMarkX
				? { opacity: [0, 0.5, 1] }
				: { opacity: [1, 0.5, 1] },
			onToggleStateChangeTransition: {
				ease: "easeInOut",
				duration: 1,
			},
			whileHover: { backgroundColor: "rgba(168, 191, 201, 0.05)" },
		},
	};

	/* custom framer-motion prop to tell framer which 
		animations to use (some btntypes might have multiple animations) 
		for each btntype
	*/
	const motionProps: { [key: string]: {} } = {
		marktoggle: {
			initial: "initial",
			animate: "onToggleStateChange",
			transition: "onToggleStateChangeTransition",
			// whileHover: markToggleActive ? (isMarkX ? "" : "whileHover") : isMarkX ? "" : "",
		},
	};

	return (
		<motion.button
			{...motionProps[btntype]}
			variants={animation[btntype]}
			onClick={onClick}
			className={clsx("defaultbtn", styling[btntype])}
		>
			{structure[btntype]}
		</motion.button>
	);
};

export default DefaultBtn;
