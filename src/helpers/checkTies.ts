import TileStatus from "@/interfaces/tileStatus";

export const checkTies = (tiles: TileStatus[], didWin: boolean) => {
	let isTie = false;

	// if there is any tiles that are not selected yet then it cannot be a tie
	// for (let i = 1; i <= 9; i++) {
	// 	if (!tiles[i].isMarkSelected) {
	// 		isTie = false;
	// 		break;
	// 	}
	// }

	if (tiles.length === 5 && !didWin) {
		isTie = true;
	}

	return isTie;
};
