import { MainData } from "./../interfaces/mainData";
import { GameModal } from "@/interfaces/mainData";
import type { Store } from "@/interfaces/store";
import TileStatus from "@/interfaces/tileStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// used as default values for loadPersistedState
const defaultMainData = {
	menu: true,
	gameModal: {
		winActive: false,
		lostActive: false,
		restartActive: false,
		tiedActive: false,
	},
	score: {
		player1: 0,
		ties: 0,
		opponent: 0,
	},
	player1: {
		players: {
			player1: true,
			player2: false,
			playercpu: false,
		},
		markTypeX: true,
		tiles: {},
	},
	opponent: {
		players: {
			player1: false,
			player2: false,
			playercpu: false,
		},
		markTypeX: false,
		tiles: {},
	},
	turn: {
		xTurn: true,
		oTurn: false,
	},
};

//need this to insure that server and client information is synced if there is any data in localStorage
const loadPersistedState = () => {
	let persistedState = defaultMainData;
	const persistedStateString = localStorage.getItem("tictactoe-data");
	persistedState = persistedStateString ? JSON.parse(persistedStateString) : persistedState;

	return persistedState;
};

export const useStore = create<Store>()(
	persist(
		(set) => ({
			mainData: {
				...loadPersistedState(),
			},
			setTile: (player: "player1" | "opponent", tileStatus: TileStatus) => {
				set((state: Store) => {
					const updatedTiles = { ...state.mainData[player].tiles, ...tileStatus };
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
			setMenuState: (status: boolean) => {
				set((state: Store) => ({
					mainData: {
						...state.mainData,
						menu: status,
					},
				}));
			},
			setModalType: (modalType: keyof GameModal, status: boolean) => {
				set((state: Store) => ({
					mainData: {
						...state.mainData,
						gameModal: {
							...state.mainData.gameModal,
							[modalType]: status,
						},
					},
				}));
			},
			setTurn: (turnType: "xTurn" | "oTurn", status: boolean) => {
				set((state: Store) => ({
					mainData: {
						...state.mainData,
						turn: { ...state.mainData.turn, [turnType]: status },
					},
				}));
			},
			setOpponentType: (opponentType: "player1" | "player2" | "playercpu", status: boolean) => {
				set((state: Store) => ({
					mainData: {
						...state.mainData,
						opponent: {
							...state.mainData.opponent,
							players: { ...state.mainData.opponent.players, [opponentType]: status },
						},
					},
				}));
			},
			setMarkType: (status: boolean) => {
				set((state: Store) => ({
					mainData: {
						...state.mainData,
						player1: { ...state.mainData.player1, markTypeX: status },
						opponent: { ...state.mainData.opponent, markTypeX: !status },
					},
				}));
			},
			resetData: () => {
				set(() => ({
					mainData: defaultMainData,
				}));
			},
			restartGame: () => {
				set((state: Store) => ({
					mainData: {
						...defaultMainData,
						menu: false,
						opponent: {
							...defaultMainData.opponent,
							players: state.mainData.opponent.players,
							markTypeX: state.mainData.opponent.markTypeX,
						},
						player1: {
							...defaultMainData.player1,
							markTypeX: state.mainData.player1.markTypeX,
						},
					},
				}));
			},
		}),
		{
			name: "tictactoe-data",
			//TODO: might need to add some time limit to this
			storage: createJSONStorage(() => localStorage),
		}
	)
);
