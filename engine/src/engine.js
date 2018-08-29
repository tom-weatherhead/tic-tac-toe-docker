// thaw-tic-tac-toe-engine/src/engine.js

// npm install --save-dev babel-cli babel-preset-env chai grunt grunt-cli grunt-contrib-watch grunt-eslint grunt-mocha-test grunt-nsp mocha

'use strict';

const config = require('../config/config');
const errorMessages = require('./error_messages');
const testDescriptors = require('./test_descriptors');

const minMaxPly = config.minMaxPly || 1;
const maxMaxPly = config.maxMaxPly || 6;

const victoryScore = 100;
const defeatScore = -victoryScore;

class Game {
	constructor (boardString, maxPly) {
		// I.e The game is being played on a 3-by-3 board.
		this.boardWidth = 3;
		this.boardHeight = 3;
		this.boardArea = this.boardWidth * this.boardHeight;
		this.boardIsSquare = this.boardWidth === this.boardHeight;
		// boardString must have a length of exactly 9 characters.
		// TODO: Support 4-by-4 boards, or even non-square boards (just skip the diagonal checks for open lines and victory)
		this.boardString = boardString;
		// TODO? Ensure that maxPly is an integer ?
		this.maxPly = maxPly;
		this.emptyNumber = ' ';
		this.victoryValue = victoryScore;
		this.defeatValue = defeatScore;

		if (typeof this.boardString !== 'string') {
			throw new Error('boardString is not a string.');
		} else if (this.boardString.length !== this.boardArea) {
			throw new Error('The length of boardString is not ' + this.boardArea + '.');
		}

		// Each character must be an 'X', an 'O', or a space. If any other characters are encountered, return an error.

		this.xPopulation = (this.boardString.match(/X/g) || []).length;
		this.oPopulation = (this.boardString.match(/O/g) || []).length;
		this.spacePopulation = (this.boardString.match(/ /g) || []).length;

		this.boardString = this.boardString.split('');
		// This should be: this.boardArray = this.boardString.split('');

		if (this.xPopulation + this.oPopulation + this.spacePopulation !== this.boardArea) {
			throw Error('boardString contains one or more invalid characters.');
		} else if (this.xPopulation === this.oPopulation) {
			this.playerToStart = 'X';
		} else if (this.xPopulation === this.oPopulation + 1) {
			this.playerToStart = 'O';
		} else {
			throw new Error('Invalid boardString due to population counts.');
		}

		this.boardPopulation = this.xPopulation + this.oPopulation;

		if (this.maxPly < minMaxPly || this.maxPly > maxMaxPly) {
			throw Error(errorMessages.maxPlyOutOfRange(this.maxPly, minMaxPly, maxMaxPly));
		}
	}

	getSquareAt (row, col) {
		return this.boardString[row * this.boardWidth + col];
	}

	setSquareAt (row, col, value) {
		// TODO? Ensure that value is one of ['X', 'O', ' '] ?
		this.boardString[row * this.boardWidth + col] = value;
	}

	isVictory (player, row, column) {
		// 1) Check the specified row.
		var victory = true;

		for (var column2 = 0; column2 < this.boardWidth; ++column2) {

			if (this.getSquareAt(row, column2) !== player) {
				victory = false;
				break;
			}
		}

		if (victory) {
			return true;
		}

		// 2) Check the specified column.
		victory = true;

		for (var row2 = 0; row2 < this.boardHeight; ++row2) {

			if (this.getSquareAt(row2, column) !== player) {
				victory = false;
				break;
			}
		}

		if (victory) {
			return true;
		}

		if (this.boardIsSquare) {
			// The board is square, so there are two diagonals that we can check.
			let i;

			if (row === column) {
				// 3) Check the primary diagonal.
				victory = true;

				for (i = 0; i < this.boardHeight; ++i) {

					if (this.getSquareAt(i, i) !== player) {
						victory = false;
						break;
					}
				}

				if (victory) {
					return true;
				}
			}

			if (row + column === this.boardHeight - 1) {
				// 4) Check the secondary diagonal.
				victory = true;

				for (i = 0; i < this.boardHeight; ++i) {

					if (this.getSquareAt(i, this.boardWidth - 1 - i) !== player) {
						victory = false;
						break;
					}
				}

				if (victory) {
					return true;
				}
			}
		}

		return false;
	}

	placePiece (player, row, column) {
		// If player is X or O, the square being written to must be empty just before the move is made.
		// If player is Empty, the square being written to must be non-empty just before the move is made.

		if (row < 0 || row >= this.boardHeight) {
			throw new Error('placePiece() : row ' + row + ' is out of range; this.boardHeight == ' + this.boardHeight);
		}

		if (column < 0 || column >= this.boardWidth) {
			throw new Error('placePiece() : column ' + column + ' is out of range; this.boardWidth == ' + this.boardWidth);
		}

		var oldSquareContent = this.getSquareAt(row, column);

		if (player !== this.emptyNumber) {

			if (oldSquareContent !== this.emptyNumber) {
				throw new Error('placePiece() : Attempted to write an X or an O into a non-empty square.');
			}
		} else if (oldSquareContent === this.emptyNumber) {
			throw new Error('placePiece() : Attempted to erase an already-empty square.');
		}

		this.setSquareAt(row, column, player);

		if (player === this.emptyNumber) {
			--this.boardPopulation;

			return false;
		} else {
			++this.boardPopulation;

			return this.isVictory(player, row, column); // This can return true for real or speculative moves.
		}
	}

	getNumOpenLines (opponent) {
		var numOpenLines = this.boardWidth + this.boardHeight + (this.boardIsSquare ? 2 : 0);
		let row;
		let column;

		// 1) Check all rows.

		for (row = 0; row < this.boardHeight; ++row) {

			for (column = 0; column < this.boardWidth; ++column) {

				if (this.getSquareAt(row, column) === opponent) {
					--numOpenLines;
					break;
				}
			}
		}

		// 2) Check all columns.

		for (column = 0; column < this.boardWidth; ++column) {

			for (row = 0; row < this.boardHeight; ++row) {

				if (this.getSquareAt(row, column) === opponent) {
					--numOpenLines;
					break;
				}
			}
		}

		if (this.boardIsSquare) {
			// 3) Check the primary diagonal.

			for (row = 0; row < this.boardWidth; ++row) {

				if (this.getSquareAt(row, row) === opponent) {
					--numOpenLines;
					break;
				}
			}

			// 4) Check the secondary diagonal.

			for (row = 0; row < this.boardWidth; ++row) {

				if (this.getSquareAt(row, this.boardWidth - 1 - row) === opponent) {
					--numOpenLines;
					break;
				}
			}
		}

		return numOpenLines;
	}

	getBoardValue (player, opponent) {		// Our heuristic function
		return this.getNumOpenLines(player) - this.getNumOpenLines(opponent);
	}

	findBestMove (player, ply, bestUncleRecursiveScore) {	// For alpha-beta pruning.
		var returnBestCoordinates = ply === this.maxPly;
		let opponent;

		if (player === 'X') {
			opponent = 'O';
		} else if (player === 'O') {
			opponent = 'X';
		} else {
			throw new Error('Cannot calculate the opponent of \'' + player + '\'.');
		}

		var bestMoveValue = this.defeatValue - 1;		// Worse than the worst possible move value.
		var bestMoveList = returnBestCoordinates ? [] : null;
		var doneSearching = false;

		for (var row = 0; row < this.boardHeight && !doneSearching; ++row) {

			for (var column = 0; column < this.boardWidth; ++column) {
				let moveValue;

				if (this.getSquareAt(row, column) !== this.emptyNumber) {
					// Is the "continue" keyword "bad" in JavaScript?
					// See e.g. https://stackoverflow.com/questions/11728757/why-are-continue-statements-bad-in-javascript
					continue;			// eslint-disable-line no-continue
				}

				if (this.placePiece(player, row, column)) { // I.e. if this move results in immediate victory.
					moveValue = this.victoryValue;
				} else if (this.boardPopulation < this.boardArea && ply > 1) {
					moveValue = -this.findBestMove(opponent, ply - 1, bestMoveValue);
				} else {
					moveValue = this.getBoardValue(player, opponent);
				}

				this.placePiece(this.emptyNumber, row, column);	// Erase the piece that was just placed.

				if (moveValue === bestMoveValue && returnBestCoordinates) {
					bestMoveList.push({row: row, column: column});
				} else if (moveValue > bestMoveValue) {
					bestMoveValue = moveValue;

					if (bestMoveValue > -bestUncleRecursiveScore) {
						// *** Here is where the alpha-beta pruning happens ****
						// Because of the initial parameters for the top-level move, this break is never executed for the top-level move.
						doneSearching = true;
						break; // ie. return.
					} else if (returnBestCoordinates) {
						bestMoveList = [{row: row, column: column}];
					} else if (bestMoveValue === this.victoryValue) {
						// Prune the search tree by searching this tree node no further, since we are not constructing a list of all of the best moves.
						doneSearching = true;
						break;
					}
				}
			}
		}

		if (bestMoveValue < this.defeatValue || bestMoveValue > this.victoryValue) {
			throw new Error('findBestMove() : the bestMoveValue \'', bestMoveValue, '\' is out of range.');
		} else if (!returnBestCoordinates) {
			return bestMoveValue;
		} else if (bestMoveList.length === 0) {
			throw new Error('findBestMove() : The bestMoveList is empty at the end of the method.');
		} else {
			var i = parseInt(Math.random() * bestMoveList.length, 10);
			var bestMove = bestMoveList[i];

			return {
				bestRow: bestMove.row,
				bestColumn: bestMove.column,
				bestMoveList: bestMoveList.sort(function (move1, move2) {

					if (move1.row !== move2.row) {
						return move1.row - move2.row;
					} else {
						return move1.column - move2.column;
					}
				}),
				bestScore: bestMoveValue,
				// boardPopulation: this.boardPopulation,
				player: player
			};
		}
	}
}

function findBestMove (boardString, maxPly) {
	let game = new Game(boardString, maxPly);

	// The third parameter helps to initialize the alpha-beta pruning.
	return game.findBestMove(game.playerToStart, game.maxPly, game.defeatValue - 1);
}

module.exports = {
	minMaxPly: minMaxPly,
	maxMaxPly: maxMaxPly,
	victoryScore: victoryScore,
	defeatScore: defeatScore,
	errorMessages: errorMessages,
	testDescriptors: testDescriptors,
	findBestMove: findBestMove
};
