import clsx from "clsx";
import React from "react";
import Image from "next/image";

const Logo = () => {
	return (
		<div className={clsx("logo", "h-fit w-fit flex gap-x-[0.823rem]")}>
			<Image
				className={clsx("logo-x-icon")}
				src={"/assets/images/icon-x.svg"}
				alt="Logo-X-Icon"
				width={32}
				height={32}
			/>
			<Image
				className={clsx("logo-o-icon")}
				src={"/assets/images/icon-o.svg"}
				alt="Logo-O-Icon"
				width={32}
				height={32}
			/>
		</div>
	);
};

export default Logo;
