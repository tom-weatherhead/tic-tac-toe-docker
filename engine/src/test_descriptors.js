// thaw-tic-tac-toe-engine/src/test_descriptors.js

'use strict';

const config = require('../config/config');

module.exports = [
	{
		name: 'SmokeTest00FirstMove',
		// . . .
		// . . .
		// . . .
		boardString: '         ',
		maxPly: 3,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.satisfy(bestScore => bestScore < engine.victoryScore);
			expect(result.bestScore).to.satisfy(bestScore => bestScore > engine.defeatScore);
		}
	},
	{
		name: 'SmokeTest01ImmediateVictory',
		// X . X
		// . . .
		// O . O
		boardString: 'X X   O O',
		maxPly: 1,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 1 }
			]);
			expect(result.bestRow).to.be.equal(0);
			expect(result.bestColumn).to.be.equal(1);
		}
	},
	{
		name: 'SmokeTest02BlockingMove',
		// X . X
		// . . .
		// O . .
		boardString: 'X X   O  ',
		maxPly: 2,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.satisfy(bestScore => bestScore > engine.defeatScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 1 }
			]);
			expect(result.bestRow).to.be.equal(0);
			expect(result.bestColumn).to.be.equal(1);
		}
	},
	{
		name: 'VictoryTest2',
		// O . .
		// . O X
		// . X .
		boardString: 'O   OX X ',
		maxPly: 3,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 2, column: 2 }
			]);
			expect(result.bestRow).to.be.equal(2);
			expect(result.bestColumn).to.be.equal(2);
		}
	},
	{
		name: 'VictoryTest3',
		// X . .
		// . . .
		// . O .
		boardString: 'X      O ',
		maxPly: 5,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 2 },
				{ row: 1, column: 1 },
				{ row: 2, column: 0 }
			]);
		}
	},
	{
		name: 'VictoryTest4',
		// . X .    X X .    X X O    X X O
		// . . . -> . . . -> . . . -> . X .
		// O . .    O . .    O . .    O . .
		boardString: ' X    O  ',
		maxPly: 5,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 0 }
			]);
			expect(result.bestRow).to.be.equal(0);
			expect(result.bestColumn).to.be.equal(0);
		}
	},
	{
		name: 'VictoryTest5',
		// X O .
		// . . .
		// . . .
		boardString: 'XO       ',
		maxPly: 5,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 1, column: 0 },
				{ row: 1, column: 1 },
				{ row: 2, column: 0 }
			]);
		}
	},
	{
		name: 'VictoryTest6',
		// O X .
		// . . X
		// . . .
		boardString: 'OX   X   ',
		maxPly: 5,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 2, column: 0 }
			]);
		}
	},
	{
		name: 'NoVictoryTest1',
		// O X .
		// . . .
		// . . .
		boardString: 'OX       ',
		maxPly: 5,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.satisfy(bestScore => bestScore < engine.victoryScore);
			expect(result.bestScore).to.satisfy(bestScore => bestScore > engine.defeatScore);
		}
	},
	{
		name: 'NoVictoryTest2',
		boardString: 'OX       ',
		maxPly: 6,
		verificationFunction: (engine, expect, result) => {
			expect(result.bestScore).to.be.equal(0);
			// expect(result.bestMoveList).to.contain({ row: 1, column: 2 });	// This would be a losing move.
			// expect(result.bestMoveList).to.contain({ row: 2, column: 1 });	// This would be a losing move.
		}
	},
	{
		name: 'maxPlyTooLow',
		boardString: '         ',
		maxPly: config.minMaxPly - 1,
		errorHandlingFunction: (engine, expect, error) => {
			const actual = error;
			const expected = engine.errorMessages.maxPlyOutOfRange(config.minMaxPly - 1, engine.minMaxPly, engine.maxMaxPly);

			expect(actual).equal(expected);
		}
	},
	{
		name: 'maxPlyTooHigh',
		boardString: '         ',
		maxPly: config.maxMaxPly + 1,
		errorHandlingFunction: (engine, expect, error) => {
			const actual = error;
			const expected = engine.errorMessages.maxPlyOutOfRange(config.maxMaxPly + 1, engine.minMaxPly, engine.maxMaxPly);

			expect(actual).equal(expected);
		}
	}
];
