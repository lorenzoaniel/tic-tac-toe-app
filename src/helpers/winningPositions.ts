export type Position = [number, number];
export type WinningPosition = [Position, Position, Position];

export const winningPositions: WinningPosition[] = [
	// Horizontal lines
	[
		[0, 0],
		[0, 1],
		[0, 2], // First row
	],
	[
		[1, 0],
		[1, 1],
		[1, 2], // Second row
	],
	[
		[2, 0],
		[2, 1],
		[2, 2], // Third row
	],
	// Vertical lines
	[
		[0, 0],
		[1, 0],
		[2, 0], // First column
	],
	[
		[0, 1],
		[1, 1],
		[2, 1], // Second column
	],
	[
		[0, 2],
		[1, 2],
		[2, 2], // Third column
	],
	// Diagonal lines
	[
		[0, 0],
		[1, 1],
		[2, 2], // Main diagonal (top-left to bottom-right)
	],
	[
		[0, 2],
		[1, 1],
		[2, 0], // Anti-diagonal (top-right to bottom-left)
	],
];
