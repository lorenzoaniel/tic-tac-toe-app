import type { MainData } from "@/interfaces/mainData";
import TileStatus from "@/interfaces/tileStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
	persist(
		(set) => ({
			mainData: <MainData>{
				// if false, switch to tictactoe game initial is set to true since menu should be rendered initially
				menu: true,
				// four states will trigger this 'win' 'lose' 'tie' 'restart'
				gameModal: {
					win: false,
					lose: false,
					tie: false,
					restart: false,
				},
				players: {
					player1: true,
					player2: false,
					playercpu: false,
				},
				score: {
					player1: 0,
					ties: 0,
					opponent: 0,
				},
				player1: {
					// Will be populated with tileStatus data
					tiles: {},
				},
				opponent: {
					// Will be populated with tileStatus data
					tiles: {},
				},
				turn: {
					xTurn: true,
					oTurn: false,
				},
				setTile: (player: "player1" | "opponent", tileStatus: TileStatus) => {
					set((state: { mainData: { [x: string]: any } }) => {
						const updatedTiles = { ...state.mainData[player].tiles, tileStatus };
						updatedTiles[player];
						return {
							mainData: {
								...state.mainData,
								[player]: {
									...state.mainData[player],
									tiles: updatedTiles,
								},
							},
						};
					});
				},
				setGameMode: (mode: "menu" | "gameModal", status: boolean) => {
					set((state: { mainData: { [x: string]: any } }) => {
						return {
							mainData: {
								...state.mainData,
								[mode]: status,
							},
						};
					});
				},
				setTurn: (turnType: "xTurn" | "oTurn", status: boolean) => {
					set((state: { mainData: { [x: string]: any } }) => {
						return {
							mainData: {
								...state.mainData,
								turn: { ...state.mainData.turn, [turnType]: status },
							},
						};
					});
				},
				setOpponentType: (opponentType: "player1" | "player2" | "playercpu", status: boolean) => {
					set((state: { mainData: { [x: string]: any } }) => {
						return {
							mainData: {
								...state.mainData,
								players: { ...state.mainData.players, [opponentType]: status },
							},
						};
					});
				},
			},
		}),
		{
			name: "tictactoe-data",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
