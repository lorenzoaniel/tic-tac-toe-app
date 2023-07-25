import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ModalActiveStatus } from "@/interfaces/modalActiveStatus";
import clsx from "clsx";
import ModalDefault from "../button/modaldefault";
import { useStore } from "@/state/useStore";
import { Store } from "@/interfaces/store";

interface Props {
	modalActiveStatus: ModalActiveStatus;
}

const Modal: React.FC<Props> = ({ modalActiveStatus }) => {
	//DISPATCH
	let dispatch = {
		resetData: useStore((state: Store) => state.resetData),
		restartGame: useStore((state: Store) => state.restartGame),
	};

	const config = {
		title: {
			winOrLose: (
				<>
					<AlertDialog.Title
						className={clsx(
							"AlertDialogTitle",
							`
                text-body text-secondary-text-300 font-bold
                md:text-heading-xs
              `
						)}
					>
						{modalActiveStatus.lostActive && "OH NO, YOU LOST..."}
						{modalActiveStatus.winActive && "YOU WON!"}
					</AlertDialog.Title>
					<AlertDialog.Description
						className={clsx(
							"AlertDialogDescription",
							`
                flex justify-between items-center gap-x-[0.9rem]
              `
						)}
					>
						{modalActiveStatus.lostActive && (
							<svg
								className={clsx(`md:w-[6.4rem] md:h-[6.4rem]`)}
								width="30"
								height="30"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
									fill="#F2B137"
								/>
							</svg>
						)}
						{modalActiveStatus.winActive && (
							<svg
								className={clsx(`md:w-[6.4rem] md:h-[6.4rem]`)}
								width="30"
								height="30"
								viewBox="0 0 64 64"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
									fill="#31C3BD"
									fillRule="evenodd"
								/>
							</svg>
						)}
						<h3
							className={clsx(
								"AlertDialogDescription-subtitle",
								`
                  text-heading-m
                  ${modalActiveStatus.winActive && "text-primary-text-200"}
                  ${modalActiveStatus.lostActive && "text-secondary-text-100"}

                  md:text-heading-l
                `
							)}
						>
							TAKES THE ROUND
						</h3>
					</AlertDialog.Description>
				</>
			),
			restartOrTie: (
				<AlertDialog.Title
					className={clsx(
						"AlertDialogTitle",
						`
              text-heading-m text-secondary-text-300
              md:text-heading-l
            `
					)}
				>
					{modalActiveStatus.restartActive && "RESTART GAME?"}
					{modalActiveStatus.tiedActive && "ROUND TIED"}
				</AlertDialog.Title>
			),
		},
		buttons: {
			winLoseTie: (
				<div
					className={clsx(
						"AlertDialogButtons",
						`
              flex gap-x-[1.6rem] 
            `
					)}
				>
					<ModalDefault title={"QUIT"} isPrimary={true} handleClick={() => dispatch.resetData()} />
					<ModalDefault
						title={"NEXT ROUND"}
						isPrimary={false}
						handleClick={() => dispatch.restartGame()}
					/>
				</div>
			),
			restartOnly: (
				<div
					className={clsx(
						"AlertDialogButtons",
						`
              flex gap-x-[1.6rem] 
            `
					)}
				>
					<ModalDefault
						title={"NO, CANCEL"}
						isPrimary={true}
						handleClick={() => dispatch.resetData()}
					/>
					<ModalDefault
						title={"YES, RESTART"}
						isPrimary={false}
						handleClick={() => dispatch.restartGame()}
					/>
				</div>
			),
		},
	};

	return (
		<AlertDialog.Root
			defaultOpen={
				modalActiveStatus.lostActive ||
				modalActiveStatus.winActive ||
				modalActiveStatus.restartActive ||
				modalActiveStatus.tiedActive
			}
		>
			<AlertDialog.Portal>
				<AlertDialog.Overlay
					className={clsx(
						"ModalOverlay",
						` 
              bg-black opacity-50 mix-blend-blend
              -z-10
            `
					)}
				/>
				<AlertDialog.Content
					className={clsx(
						"ModalDialogContent",
						`
							absolute top-[50%]
              h-[22.8rem] w-full
              bg-primary-bg-200
              p-[4.8rem]
              flex flex-col items-center 
              ${(modalActiveStatus.lostActive || modalActiveStatus.winActive) && "justify-between"}
              ${
								(modalActiveStatus.restartActive || modalActiveStatus.tiedActive) &&
								"gap-y-[2.4rem]"
							}

              md:h-[26.6rem]
            `
					)}
				>
					{
						// Renders title section for win or loss variant
						(modalActiveStatus.lostActive || modalActiveStatus.winActive) && config.title.winOrLose
					}
					{
						// Renders title section for restart or tied variant
						(modalActiveStatus.restartActive || modalActiveStatus.tiedActive) &&
							config.title.restartOrTie
					}
					{
						// Renders button section for win/loss/tied variant
						(modalActiveStatus.lostActive ||
							modalActiveStatus.winActive ||
							modalActiveStatus.tiedActive) &&
							config.buttons.winLoseTie
					}
					{
						// Renders button section for restart variant
						modalActiveStatus.restartActive && config.buttons.restartOnly
					}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default Modal;
