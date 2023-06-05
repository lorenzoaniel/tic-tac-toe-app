// import Image from "next/image";
import Menu from "@/components/menu";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className={clsx("app", "h-full overflow-y-scroll grid bg-primary-bg-100 py-[18%]")}>
			<Menu />
		</main>
	);
}
