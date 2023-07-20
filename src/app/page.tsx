"use client";

import Board from "@/components/board";
import Menu from "@/components/menu";
import { Store } from "@/interfaces/store";
import { useStore } from "@/state/useStore";
import clsx from "clsx";

export default function Home() {
	const menuState = useStore((state: Store) => state.mainData.menu);

	return (
		<main
			className={clsx(
				"app",
				`
					h-full
					overflow-y-scroll
					grid items-center justify-items-center
					bg-primary-bg-100
					py-[18%]
				`
			)}
		>
			{menuState ? <Menu /> : <Board />}
		</main>
	);
}
