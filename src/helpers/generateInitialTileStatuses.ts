import TileStatus from "@/interfaces/tileStatus";

export const generateInitialTileStatuses = (): Record<number, TileStatus> => {
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
