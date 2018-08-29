# thaw-tic-tac-toe-engine

[![build status](https://secure.travis-ci.org/tom-weatherhead/thaw-tic-tac-toe-engine.svg)](http://travis-ci.org/tom-weatherhead/thaw-tic-tac-toe-engine)  [![downloads](https://img.shields.io/npm/dt/thaw-tic-tac-toe-engine.svg)](https://www.npmjs.com/package/thaw-tic-tac-toe-engine)

A Node.js Tic-Tac-Toe game engine with alpha-beta pruning and a heuristic, packaged for npm.

Git installation instructions:

	$ git clone https://github.com/tom-weatherhead/thaw-tic-tac-toe-engine.git
	$ cd thaw-tic-tac-toe-engine
	$ npm install -g grunt
	$ npm install
	$ grunt

npm Installation Instructions:

	$ npm install [--save] thaw-tic-tac-toe-engine

Note: The command "grunt" runs lint, unit tests, and security tests.

Sample usage of the npm package:

	let engine = require('thaw-tic-tac-toe-engine');

	let boardString = 'X X   O  ';
	let maxPly = 2;		// maxPly is the desired maximum depth of the best move search tree.

	try {
		let result = engine.findBestMove(boardString, maxPly);

		console.log(result);
	} catch (error) {
		console.error('engine.findBestMove() threw an exception:', error);
	}

Output:

	{ bestRow: 0,
	  bestColumn: 1,
	  bestMoveList: [ { row: 0, column: 1 } ],
	  bestScore: 1,
	  player: 'O' }
