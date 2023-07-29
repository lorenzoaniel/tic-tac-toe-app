import { GameModal } from "@/interfaces/mainData";
import PlayerIdentity from "@/interfaces/playeridentity";
import { ScoreType } from "@/interfaces/scoreType";
import TileStatus from "@/interfaces/tileStatus";
import { Position, winningPositions } from "./winningPositions";

export const checkWin = (player: "player1" | "opponent", tiles: TileStatus[]): boolean => {
	let didWin = false;

	// Function to check if a position exists in a player's tiles
	const isPositionInPlayerTiles = (pos: Position, playerTiles: TileStatus[]) => {
		return playerTiles.some(
			(tile) => tile.isMarkSelected && tile.pos.x === pos[0] && tile.pos.y === pos[1]
		);
	};

	// Separate tiles based on the player
	const playerTiles = tiles.filter((tile) =>
		player === "player1" ? tile.isPlayer1Tile : !tile.isPlayer1Tile
	);

	// Check all winning positions
	for (let pos of winningPositions) {
		if (
			isPositionInPlayerTiles(pos[0], playerTiles) &&
			isPositionInPlayerTiles(pos[1], playerTiles) &&
			isPositionInPlayerTiles(pos[2], playerTiles)
		) {
			didWin = true;
		}
	}

	return didWin;
};
