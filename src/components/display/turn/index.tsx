import clsx from "clsx";
import React from "react";

interface Props {
	isTurnX: boolean;
}

const TurnDisplay: React.FC<Props> = ({ isTurnX }) => {
	return (
		<div
			className={clsx(
				"turn-display",
				`
          h-[4rem] w-[9.6rem]
          bg-primary-bg-200
          flex justify-between items-center
          px-[1.5rem]
          rounded-[0.5rem]
          shadow-[inset_0rem_-0.4rem_0rem_#10212A]

          md:h-[5.2rem] md:w-[14rem]
          md:px-[3rem]
          md:rounded-[1rem]
        `
			)}
		>
			{isTurnX ? (
				<svg
					width="16"
					height="16"
					className={clsx("md:h-[2rem] md:w-[2rem]")}
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
						fill="#A8BFC9"
						fillRule="evenodd"
					/>
				</svg>
			) : (
				<svg
					width="16"
					height="16"
					className={clsx("md:h-[2rem] md:w-[2rem]")}
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
						fill="#A8BFC9"
					/>
				</svg>
			)}
			<h3
				className={clsx(
					"turn-display-title",
					`
            text-body text-secondary-text-300

            md:text-heading-xs
          `
				)}
			>
				TURN
			</h3>
		</div>
	);
};

export default TurnDisplay;
