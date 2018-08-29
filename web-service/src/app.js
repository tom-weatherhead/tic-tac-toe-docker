// thaw-tic-tac-toe-web-service/src/app.js

// A Web server that makes the functionality in the Tic-Tac-Toe engine in thaw-tic-tac-toe-engine available as a Web service.

'use strict';

const gameEngine = require('thaw-tic-tac-toe-engine');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const router = express.Router();				// eslint-disable-line new-cap

router.get('/:board([EXO]{9})/:maxPly([0-9]{1})', function (req, res) {
	//console.log('BEGIN router.get(board, maxPly);');
	// Global replace in string: See https://stackoverflow.com/questions/38466499/how-to-replace-all-to-in-nodejs
	const boardString = req.params.board.replace(/E/g, ' ');		// Replaces all 'E' with ' '.
	const maxPly = parseInt(req.params.maxPly, 10);

	try {
		const result = gameEngine.findBestMove(boardString, maxPly);

		res.json(result);
	} catch (error) {
		// For a description of the Node.js Error class, see https://nodejs.org/api/errors.html#errors_class_error
		res.status(500).send(error.message);
	}
});

app.use('/tictactoe', router);

module.exports = {
	app: app,
	gameEngine: gameEngine
};

// End of File.
