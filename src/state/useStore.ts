import type PlayerIdentity from "@/interfaces/playeridentity";
import TileStatus from "@/interfaces/tileStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
	persist(
		(set, get) => ({
			mainData: {
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
				setTile: (player: "player1" | "opponent", tileStatus: TileStatus) => {},
			},
		}),
		{
			name: "tictactoe-data",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
