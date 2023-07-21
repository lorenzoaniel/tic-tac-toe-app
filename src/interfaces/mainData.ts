import { playerInfo } from "./playerInfo";
import type TileStatus from "./tileStatus";

export type GameModal = {
	winActive: boolean;
	lostActive: boolean;
	restartActive: boolean;
	tiedActive: boolean;
};

export type MainData = {
	menu: boolean;
	gameModal: GameModal;
	score: {
		player1: number;
		ties: number;
		opponent: number;
	};
	player1: playerInfo;
	opponent: playerInfo;
	tiles: Record<number, TileStatus>;
	isXTurn: boolean;
};
