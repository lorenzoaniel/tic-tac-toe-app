import type { MainData } from "./../interfaces/mainData";
import type { GameModal } from "@/interfaces/mainData";
import type { Store } from "@/interfaces/store";
import type TileStatus from "@/interfaces/tileStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { defaultMainData, loadPersistedState } from "@/helpers/loadPersistedState";
import { checkWin } from "@/helpers/checkWin";
import { greedyMove } from "@/helpers/botMoves";
import { ScoreType } from "@/interfaces/scoreType";
import { generateInitialTileStatuses } from "@/helpers/generateInitialTileStatuses";
import { checkTies } from "@/helpers/checkTies";

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
			setModalType: (modalType?: keyof GameModal, status?: boolean, reset?: boolean) => {
				// if changing an individual property
				if (modalType !== undefined && status !== undefined) {
					set((state: Store) => ({
						mainData: {
							...state.mainData,
							gameModal: {
								...state.mainData.gameModal,
								[modalType]: status,
							},
						},
					}));
				}
				// if there is a reset option then modal resets to default of all false
				if (reset) {
					set((state: Store) => ({
						mainData: {
							...state.mainData,
							gameModal: {
								...defaultMainData.gameModal,
							},
						},
					}));
				}
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
					mainData: {
						...defaultMainData,
						score: {
							player1: 0,
							ties: 0,
							opponent: 0,
						},
						tiles: generateInitialTileStatuses(),
					},
				}));
			},
			restartGame: () => {
				/* 
					- menu is set to false so as to keep Board component present
					- opponent and player marktypes as well as the type of player they are kept in tact
					- score is set to persist

				*/
				set((state: Store) => ({
					mainData: {
						...defaultMainData,
						score: state.mainData.score,
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
						tiles: generateInitialTileStatuses(),
					},
				}));
			},
			checkTilesForWinner: (player: "player1" | "opponent") => {
				let result: { score: ScoreType; modal: GameModal; didWin: boolean };

				/* 
					checkWin will loop through all winningPositions and compare player tiles
					will also check for ties and increment score.
				*/

				set((state: Store) => {
					result = {
						score: {
							...state.mainData.score,
						},
						modal: {
							...state.mainData.gameModal,
						},
						didWin: false,
					};

					if (checkWin(player, state.mainData[player].tiles)) {
						result = {
							score: {
								...state.mainData.score,
								[player]: ++state.mainData.score[player],
							},
							modal: {
								...state.mainData.gameModal,
								winActive: true,
							},
							didWin: true,
						};
					}

					// Check for ties
					if (checkTies(state.mainData[player].tiles, result.didWin)) {
						result = {
							score: {
								...state.mainData.score,
								ties: ++state.mainData.score.ties,
							},
							modal: {
								...state.mainData.gameModal,
								tiedActive: true,
							},
							didWin: false,
						};
					}

					return {
						mainData: {
							...state.mainData,
							gameModal: result.modal,
							score: result.score,
							[player]: {
								...state.mainData[player],
								didWin: result.didWin,
							},
						},
					};
				});
			},
		}),
		{
			name: "tictactoe-data",
			//TODO: might need to add some time limit to this
			storage: createJSONStorage(() => localStorage),
		}
	)
);
