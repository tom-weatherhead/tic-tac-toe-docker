// thaw-tic-tac-toe-web-service/test/app_spec.js

'use strict';

// Use chai and chai-http to test our app.
// See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html

const pkg = require('..');
const app = pkg.app;
const gameEngine = pkg.gameEngine;
// const errorMessages = gameEngine.errorMessages;
const testDescriptors = gameEngine.testDescriptors;

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {
	testDescriptors.forEach(testDescriptor => {
		describe(testDescriptor.name, function () {
			it('Rocks!', function (done) {
				// Arrange
				const url = '/tictactoe/' + testDescriptor.boardString.replace(/ /g, 'E') + '/' + testDescriptor.maxPly;

				// Act
				chai.request(app).get(url).end(function (error, result) {
					// Assert

					if (error) {
						expect(testDescriptor.errorHandlingFunction).to.be.not.null;	// eslint-disable-line no-unused-expressions
						// testDescriptor.errorHandlingFunction(gameEngine, expect, error);
						testDescriptor.errorHandlingFunction(gameEngine, expect, result.error.text);
					} else {
						expect(error).to.be.null;										// eslint-disable-line no-unused-expressions
						expect(result).to.be.not.null;									// eslint-disable-line no-unused-expressions
						expect(result.body).to.be.not.null;								// eslint-disable-line no-unused-expressions
						expect(testDescriptor.verificationFunction).to.be.not.null;		// eslint-disable-line no-unused-expressions
						testDescriptor.verificationFunction(gameEngine, expect, result.body);
					}

					done();
				});
			});
		});
	});
});
