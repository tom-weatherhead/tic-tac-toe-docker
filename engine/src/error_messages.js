// thaw-tic-tac-toe-engine/src/error_messages.js

'use strict';

module.exports = {
	gameEngineError: errorMessage => {
		return 'The Tic-Tac-Toe game engine threw an exception: ' + errorMessage;
	},
	maxPlyOutOfRange: (maxPly, minMaxPly, maxMaxPly) => {
		return 'maxPly \'' + maxPly + '\' is not in the range [' + minMaxPly + ', ' + maxMaxPly + '].';
	}
};
