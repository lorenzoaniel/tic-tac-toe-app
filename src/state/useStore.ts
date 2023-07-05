import type PlayerIdentity from "@/interfaces/playeridentity";
import TileStatus from "@/interfaces/tileStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
	persist(
		(set, get) => ({
			mainData: {
				gameMode: {
					menu: true, // if false switch to tictactoe game initial is set to true since menu should be rendered initially
					// four states will trigger this 'win' 'lose' 'tie' 'quit'
					gameEnded: false,
				},
				players: <PlayerIdentity>{
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
					tiles: {},
				},
				opponent: {
					tiles: {},
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
				setGameMode: {},
			},
		}),
		{
			name: "tictactoe-data",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
