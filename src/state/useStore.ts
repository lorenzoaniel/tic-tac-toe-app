// import { ScoreType } from './../interfaces/scoreType';
import { ScoreType } from "@/interfaces/scoreType";
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
		didWin: false,
	},
	opponent: {
		players: {
			player1: false,
			player2: false,
			playercpu: false,
		},
		tiles: [],
		markTypeX: false,
		didWin: false,
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
					mainData: { ...defaultMainData },
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
					},
				}));
			},
			checkTilesForWinner: (player: "player1" | "opponent") => {
				type Position = [number, number];
				type WinningPosition = [Position, Position, Position];
				let result;

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

				/* 
					checkWin will loop through all winningPositions and compare player tiles
					will also check for ties and increment score.
				*/

				set((state: Store) => {
					const checkWin = (tiles: TileStatus[], score: ScoreType) => {
						let scoreHolder: ScoreType = score;
						let gameModal: GameModal = {
							// if player is player1 or player2
							winActive: false,
							lostActive: false,
							restartActive: false,
							tiedActive: false,
						};
						let didWin = false;

						// goes through all winning combos
						for (const currWinningPos of winningPositions) {
							let matchCounter = 0; // used to determine if there is a winner
							// loops through player tiles
							tiles.some((currTile) => {
								// compares player tile pos with all three patterns per currWinningPos
								if (
									(currTile.pos.x === currWinningPos[0][0] &&
										currTile.pos.y === currWinningPos[0][1]) ||
									(currTile.pos.x === currWinningPos[1][0] &&
										currTile.pos.y === currWinningPos[1][1]) ||
									(currTile.pos.x === currWinningPos[2][0] &&
										currTile.pos.y === currWinningPos[2][1])
								) {
									// increases match counter if condition above is passed
									matchCounter++;

									// checks for a winner
									if (matchCounter >= 3) {
										// increases score
										scoreHolder = {
											...score,
											[player]: ++score[player],
										};
										// set modal to player that won
										gameModal = {
											// if player is player1 or player2
											winActive:
												player === "player1" ||
												useStore.getState().mainData.opponent.players.player2,
											// if player is cpu
											lostActive: useStore.getState().mainData.opponent.players.playercpu,
											restartActive: false,
											tiedActive: false,
										};
										// sets didWin for winning player for use in other components
										didWin = true;
										return null;
									}
								}
							});
						}

						//for TIES
						/* 
							checks if player selected has 5 tiles since there are 9 in total one player will
							will have 5, this player will place the last tile in essence. Also checks if game modal has any true values,
							if so then that means there was a winner and therefore cannot be a tie.
						*/
						if (tiles.length === 5 && !Object.values(gameModal).some((value) => value === true)) {
							scoreHolder = {
								...score,
								ties: ++score.ties,
							};
							// set modal to player that won
							gameModal = {
								// if player is player1 or player2
								winActive: false,
								lostActive: false,
								restartActive: false,
								tiedActive: true,
							};
						}

						return { score: scoreHolder, modal: gameModal, didWin: didWin };
					};

					result = checkWin(state.mainData[player].tiles, state.mainData.score);

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
