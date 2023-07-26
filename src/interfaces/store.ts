import { GameModal, MainData } from "./mainData";
import TileStatus from "./tileStatus";

export interface StoreActions {
	setTile: (index: number, tileStatus: TileStatus) => void;
	setMenuState: (status: boolean) => void;
	setModalType: (modalType?: keyof GameModal, status?: boolean, reset?: boolean) => void;
	setTurn: (status: boolean) => void;
	setOpponentType: (opponentType: "player1" | "player2" | "playercpu", status: boolean) => void;
	setMarkType: (status: boolean) => void;
	resetData: () => void;
	restartGame: () => void;
	checkTilesForWinner: (player: "player1" | "opponent") => void;
}

export interface Store extends StoreActions {
	mainData: MainData;
}
