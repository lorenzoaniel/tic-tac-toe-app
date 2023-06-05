import clsx from "clsx";
import "./globals.css";

export const metadata = {
	title: "Tic Tac Toe",
	description: "Tic Tac Toe App challenge from front end mentor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={clsx("html", "h-[100vh] text-[62.5%]")} lang="en">
			<body className={clsx("body", "h-full text-[1.6rem] bg-yellow-100")}>{children}</body>
		</html>
	);
}
