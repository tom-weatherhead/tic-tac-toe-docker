// thaw-tic-tac-toe-engine/test/engine_spec.js

'use strict';

// Chai.js cheat sheet: See http://ricostacruz.com/cheatsheets/chai.html
const chai = require('chai');
const expect = chai.expect;

const engine = require('..');

const testDescriptors = engine.testDescriptors;

describe('App', function () {
	testDescriptors.forEach(testDescriptor => {
		describe(testDescriptor.name, function () {
			it('Rocks!', function (done) {

				try {
					// Arrange
					// Act
					const result = engine.findBestMove(testDescriptor.boardString, testDescriptor.maxPly);

					// Assert
					expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
					expect(testDescriptor.verificationFunction).to.be.not.null;		// eslint-disable-line no-unused-expressions
					testDescriptor.verificationFunction(engine, expect, result);
				} catch (error) {
					expect(testDescriptor.errorHandlingFunction).to.be.not.null;	// eslint-disable-line no-unused-expressions
					testDescriptor.errorHandlingFunction(engine, expect, error.message);
				} finally {
					done();
				}
			});
		});
	});
});
