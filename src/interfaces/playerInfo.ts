import PlayerIdentity from "./playeridentity";
import TileStatus from "./tileStatus";

export interface playerInfo {
	players: PlayerIdentity;
	markTypeX: boolean;
	tiles: TileStatus[];
}
