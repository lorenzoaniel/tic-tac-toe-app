import TileStatus from "@/interfaces/tileStatus";
import { checkWin } from "./checkWin";

export const greedyMove = (
	player1Tiles: TileStatus[],
	cpuTiles: TileStatus[],
	boardTiles: Record<number, TileStatus>
): number => {
	let didWin = false;

	// Check if the bot can win
	for (const tileID in boardTiles) {
		if (!boardTiles[tileID].isMarkSelected) {
			boardTiles[tileID].isMarkSelected = true;
			boardTiles[tileID].isPlayer1Tile = false;
			if (checkWin("opponent", [...cpuTiles, boardTiles[tileID]])) {
				return parseInt(tileID); // Return the winning move
			}
			boardTiles[tileID].isMarkSelected = false; // Reset the tile
		}
	}

	// Check if the opponent can win and block them
	for (const tileID in boardTiles) {
		if (!boardTiles[tileID].isMarkSelected) {
			boardTiles[tileID].isMarkSelected = true;
			boardTiles[tileID].isPlayer1Tile = true;
			if (checkWin("player1", [...player1Tiles, boardTiles[tileID]])) {
				return parseInt(tileID);
			}
			boardTiles[tileID].isMarkSelected = false; // Reset the tile
			boardTiles[tileID].isPlayer1Tile = false;
		}
	}

	// If there is no immediate win or block, just make a random move
	for (const tileID in boardTiles) {
		if (!boardTiles[tileID].isMarkSelected) {
			return parseInt(tileID);
		}
	}

	throw new Error("No available moves");
};
