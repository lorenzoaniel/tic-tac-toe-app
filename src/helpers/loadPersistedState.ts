import { MainData } from "@/interfaces/mainData";
import { generateInitialTileStatuses } from "./generateInitialTileStatuses";

//need this to insure that server and client information is synced if there is any data in localStorage
export const loadPersistedState = () => {
	const persistedStateString = localStorage.getItem("tictactoe-data");
	return persistedStateString ? JSON.parse(persistedStateString) : defaultMainData;
};

// used as default values for loadPersistedState
export const defaultMainData: MainData = {
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
