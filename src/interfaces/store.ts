import { MainData } from "./mainData";
import TileStatus from "./tileStatus";

export interface StoreActions {
	setTile: (tileStatus: TileStatus) => void;
	setMenuState: (status: boolean) => void;
	setModalType: (
		modalType: "winActive" | "lostActive" | "restartActive" | "tiedActive",
		status: boolean
	) => void;
	setTurn: (status: boolean) => void;
	setOpponentType: (opponentType: "player1" | "player2" | "playercpu", status: boolean) => void;
	setMarkType: (status: boolean) => void;
	resetData: () => void;
	restartGame: () => void;
}

export interface Store extends StoreActions {
	mainData: MainData;
}
