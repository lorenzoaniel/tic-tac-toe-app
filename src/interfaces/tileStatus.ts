export default interface TileStatus {
	isMarkSelected: boolean; //this represents if this tiles X or O mark has been clicked
	isPlayer1Tile: boolean;
	isMarkX: boolean;
	tileID: number;
	pos: { x: number; y: number }; //tile position
}
