import PlayerIdentity from "./playeridentity";
import TileStatus from "./tileStatus";

export interface MainData {
	menu: boolean;
	// will not be present unless menu is true
	gameModal?: {
		win: boolean;
		lose: boolean;
		tie: boolean;
		restart: boolean;
	};
	players: PlayerIdentity;
	score: {
		player1: number;
		ties: number;
		opponent: number;
	};
	player1: {
		tiles: TileStatus[];
	};
	opponent: {
		tiles: TileStatus[];
	};
	turn: {
		xTurn: boolean;
		oTurn: boolean;
	};
	setTile: (player: "player1" | "opponent", tileStatus: TileStatus) => void;
	setGameMode: (mode: "menu" | "gameModal", status: boolean) => void;
	setTurn: (turnType: "xTurn" | "oTurn", status: boolean) => void;
	setOpponentType: (opponentType: "player1" | "player2" | "playercpu", status: boolean) => void;
}
