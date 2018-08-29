// thaw-tic-tac-toe-engine/test/smoke_test.js

'use strict';

const engine = require('..');

const boardWidth = 3;

function makeNewBoardString (boardString, result) {
	let boardArray = boardString.split('');

	console.log('Before:', boardString);
	console.log('bestMoveList length is', result.bestMoveList.length);
	console.log('bestMoveList is', result.bestMoveList);
	console.log('bestScore is', result.bestScore);
	console.log('Assigning', result.player, 'to row', result.bestRow, ', column', result.bestColumn, '...');
	boardArray[result.bestRow * boardWidth + result.bestColumn] = result.player;

	console.log('After:', boardArray.join(''));

	return boardArray.join('');
}

function smokeTest (boardString, maxPly) {

	try {
		let result = engine.findBestMove(boardString, maxPly);

		console.log('engine.findBestMove() returned:', result);

		return result;
	} catch (error) {
		console.error('engine.findBestMove() threw an exception:', error);

		return null;
	}
}

// smokeTest('         ', 5);
// smokeTest('    X    ', 5);

// let boardString = '         ';
// let maxPly = 6;

// for (var i = 0; i < boardString.length; ++i) {
//	let result = smokeTest(boardString, maxPly);

// 	if (!result) {
//		console.error('Boom! result is null.');
//		break;
//	}

//	boardString = makeNewBoardString(boardString, result);
//	console.log();
// }

function test00 () {
	let boardString = 'X X   O O';
	let maxPly = 1;
	let result = smokeTest(boardString, maxPly);

	makeNewBoardString(boardString, result);
}

function test01 () {
	let boardString = 'X X   O O';
	let maxPly = 2;
	let result = smokeTest(boardString, maxPly);

	makeNewBoardString(boardString, result);
}

function test02 () {
	let boardString = 'X X   O  ';
	let maxPly = 2;
	let result = smokeTest(boardString, maxPly);

	makeNewBoardString(boardString, result);
}

test00();
test01();
test02();

console.log('Done!');
