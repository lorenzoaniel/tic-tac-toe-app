import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import clsx from "clsx";
import ModalDefault from "../button/modaldefault";
import { useStore } from "@/state/useStore";
import { Store } from "@/interfaces/store";

const Modal: React.FC = () => {
	//SELECTOR
	let selector = {
		modalActiveStatus: useStore((state: Store) => state.mainData.gameModal),
		players: {
			player1: useStore((state: Store) => state.mainData.player1),
			opponent: useStore((state: Store) => state.mainData.opponent),
		},
		score: useStore((state: Store) => state.mainData.score),
	};

	//DISPATCH
	let dispatch = {
		resetData: useStore((state: Store) => state.resetData),
		restartGame: useStore((state: Store) => state.restartGame),
		setModalType: useStore((state: Store) => state.setModalType),
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
						{/* 
							- lost against opponent
							- won against opponent
							- 
						*/}
						{selector.modalActiveStatus.lostActive && "OH NO, YOU LOST..."}
						{selector.modalActiveStatus.winActive &&
							selector.players.opponent.players.playercpu &&
							"YOU WON!"}
						{selector.modalActiveStatus.winActive &&
							(selector.players.opponent.players.player1 ||
								selector.players.opponent.players.player2) &&
							`${selector.players.player1.didWin ? "PLAYER 1 " : "PLAYER 2 "} WINS`}
					</AlertDialog.Title>
					<AlertDialog.Description
						className={clsx(
							"AlertDialogDescription",
							`
                flex justify-between items-center gap-x-[0.9rem]
              `,
							`
                  text-heading-m
                  ${selector.modalActiveStatus.winActive && "text-primary-text-200"}
                  ${selector.modalActiveStatus.lostActive && "text-secondary-text-100"}

                  md:text-heading-l
                `
						)}
					>
						{selector.modalActiveStatus.lostActive && (
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
						{selector.modalActiveStatus.winActive && (
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
						TAKES THE ROUND
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
					{selector.modalActiveStatus.restartActive && "RESTART GAME?"}
					{selector.modalActiveStatus.tiedActive && "ROUND TIED"}
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
						// this enables a modal reset to remove modal from screen
						handleClick={() => dispatch.setModalType(undefined, undefined, true)}
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
				selector.modalActiveStatus.lostActive ||
				selector.modalActiveStatus.winActive ||
				selector.modalActiveStatus.restartActive ||
				selector.modalActiveStatus.tiedActive
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
              ${
								(selector.modalActiveStatus.lostActive || selector.modalActiveStatus.winActive) &&
								"justify-between"
							}
              ${
								(selector.modalActiveStatus.restartActive ||
									selector.modalActiveStatus.tiedActive) &&
								"gap-y-[2.4rem]"
							}

              md:h-[26.6rem]
            `
					)}
				>
					{
						// Renders title section for win or loss variant
						(selector.modalActiveStatus.lostActive || selector.modalActiveStatus.winActive) &&
							config.title.winOrLose
					}
					{
						// Renders title section for restart or tied variant
						(selector.modalActiveStatus.restartActive || selector.modalActiveStatus.tiedActive) &&
							config.title.restartOrTie
					}
					{
						// Renders button section for win/loss/tied variant
						(selector.modalActiveStatus.lostActive ||
							selector.modalActiveStatus.winActive ||
							selector.modalActiveStatus.tiedActive) &&
							config.buttons.winLoseTie
					}
					{
						// Renders button section for restart variant
						selector.modalActiveStatus.restartActive && config.buttons.restartOnly
					}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default Modal;
