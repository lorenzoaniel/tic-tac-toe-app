import clsx from "clsx";
import React from "react";

interface Props {
	btntype: string;
	markToggleActive?: boolean;
	isMarkX?: boolean;
}

const DefaultBtn: React.FC<Props> = ({ btntype, markToggleActive, isMarkX }) => {
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
	};

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
						: "bg-transparent"
					: isMarkX
					? "bg-transparent"
					: "bg-secondary-btn-300"
			}
			rounded-[1rem]
			flex justify-center items-center

			md:w-[19.8rem]
		`,
	};

	return <button className={clsx("defaultbtn", styling[btntype])}>{structure[btntype]}</button>;
};

export default DefaultBtn;
