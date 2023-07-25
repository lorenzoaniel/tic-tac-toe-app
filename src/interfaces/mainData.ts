import type { playerInfo } from "./playerInfo";
import type { ScoreType } from "./scoreType";
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
	score: ScoreType;
	player1: playerInfo;
	opponent: playerInfo;
	tiles: Record<number, TileStatus>;
	isXTurn: boolean;
};
