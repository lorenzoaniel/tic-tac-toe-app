import { MainData } from "./../interfaces/mainData";
import { GameModal } from "@/interfaces/mainData";
import type { Store } from "@/interfaces/store";
import TileStatus from "@/interfaces/tileStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const generateInitialTileStatuses = (): Record<number, TileStatus> => {
	let tiles: Record<number, TileStatus> = {};

	for (let i = 1; i <= 9; i++) {
		tiles[i] = {
			isMarkSelected: false,
			isPlayer1Tile: false,
			isMarkX: false,
			tileID: i,
			pos: { x: Math.floor((i - 1) % 3), y: Math.floor((i - 1) / 3) },
		};
	}

	return tiles;
};

// used as default values for loadPersistedState
const defaultMainData: MainData = {
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
		tiles: [],
		markTypeX: true,
	},
	opponent: {
		players: {
			player1: false,
			player2: false,
			playercpu: false,
		},
		tiles: [],
		markTypeX: false,
	},
	tiles: generateInitialTileStatuses(),
	isXTurn: true,
};

//need this to insure that server and client information is synced if there is any data in localStorage
const loadPersistedState = () => {
	const persistedStateString = localStorage.getItem("tictactoe-data");
	return persistedStateString ? JSON.parse(persistedStateString) : defaultMainData;
};

export const useStore = create<Store>()(
	persist(
		(set) => ({
			mainData: <MainData>{
				...loadPersistedState(),
			},
			setTile: (index: number, tileStatus: TileStatus) => {
				// sets tile info to the general 'tiles' state
				set((state: Store) => {
					return {
						mainData: {
							...state.mainData,
							tiles: { ...state.mainData.tiles, [index]: tileStatus },
						},
					};
				});
				// sets tile info to the respective player
				set((state: Store) => {
					const player = state.mainData.tiles[index].isPlayer1Tile ? "player1" : "opponent";

					return {
						mainData: {
							...state.mainData,
							[player]: {
								...state.mainData[player],
								tiles: [...state.mainData[player].tiles, tileStatus],
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
			setTurn: (status: boolean) => {
				set((state: Store) => ({
					mainData: {
						...state.mainData,
						isXTurn: status,
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
			checkTilesForWinner: () => {
				type Position = [number, number];
				type WinningPosition = [Position, Position, Position];

				const winningPositions: WinningPosition[] = [
					// Horizontal lines
					[
						[0, 0],
						[0, 1],
						[0, 2], // First row
					],
					[
						[1, 0],
						[1, 1],
						[1, 2], // Second row
					],
					[
						[2, 0],
						[2, 1],
						[2, 2], // Third row
					],
					// Vertical lines
					[
						[0, 0],
						[1, 0],
						[2, 0], // First column
					],
					[
						[0, 1],
						[1, 1],
						[2, 1], // Second column
					],
					[
						[0, 2],
						[1, 2],
						[2, 2], // Third column
					],
					// Diagonal lines
					[
						[0, 0],
						[1, 1],
						[2, 2], // Main diagonal (top-left to bottom-right)
					],
					[
						[0, 2],
						[1, 1],
						[2, 0], // Anti-diagonal (top-right to bottom-left)
					],
				];

				const loopThroughTilesData = (tiles: TileStatus[]) => {
					for (let i = 1; i <= 9; i++) {
						tiles[i];
					}

					return 0;
				};

				set((state: Store) => ({
					mainData: {
						...state.mainData,
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
