import clsx from "clsx";
import React from "react";
import DefaultBtn from "../defaultbtn";

interface Props {
	markToggleActive: boolean;
}

//TODO: animations

const MarkToggleBtn: React.FC<Props> = ({ markToggleActive }) => {
	return (
		<div
			className={clsx(
				"marktogglebtn",
				"h-[7.2rem] w-[27.9rem] bg-primary-bg-100 rounded-[1rem]",
				"flex justify-center items-center",
				"md:w-[41.2rem]"
			)}
		>
			<DefaultBtn btntype={"marktoggle"} markToggleActive={markToggleActive} isMarkX={true} />
			<DefaultBtn btntype={"marktoggle"} markToggleActive={markToggleActive} isMarkX={false} />
		</div>
	);
};

export default MarkToggleBtn;
