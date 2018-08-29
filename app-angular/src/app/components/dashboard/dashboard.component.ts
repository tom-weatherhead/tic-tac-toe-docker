import { Component, OnInit /*, ChangeDetectorRef */ }		from '@angular/core';

import { HttpClient /*, HttpHeaders */ }			from '@angular/common/http';
//import { EmptyError } from 'rxjs';

import { Observable }								from 'rxjs/Observable';

// const httpOptions = {
// 	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

const nBoardDimension = 3;
const nBoardWidth = nBoardDimension;
const nBoardHeight = nBoardDimension;
const nBoardArea = nBoardWidth * nBoardHeight;

const EmptyNumber = -1;
const XNumber = 0;
const ONumber = 1;

//const PlayerNames = ['X', 'O'];
const PlayerNames = ['x', 'o'];

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
	boardPopulation = [0, 0];
	aBoardImageNumbers: number[] = [
		EmptyNumber, EmptyNumber, EmptyNumber,
		EmptyNumber, EmptyNumber, EmptyNumber,
		//EmptyNumber, XNumber, ONumber,
		EmptyNumber, EmptyNumber, EmptyNumber
	];	// new Array(nBoardArea);
	numberOfCurrentPlayer = XNumber;
	PlayerIsAutomated = [false, true];
	PlayerPly = [6, 6];
	
	constructor(
		private http: HttpClient
		/* private changeDetectorRef: ChangeDetectorRef,
		private universityService: UniversityService */
	) { }

	ngOnInit(): void {
		// this.universityService.getUniversities()
		// 	.subscribe(universities => {
		// 		this.universities = universities.slice(0, 4);
		// 		this.changeDetectorRef.detectChanges();			// !!! This is necessary.
		// 		console.log('DashboardComponent ngOnInit() : universities is', universities);
		// 	});
	}

	sendWebServiceRequest(boardString: string, maxPly: number): Observable<any> {
		return this.http.get<any>(`http://localhost:3000/tictactoe/${boardString}/${maxPly}`);
			// .switchMap(universities => Observable.of(universities.sort((a, b) => a.id - b.id)))
			// .pipe(
			// 	tap(universities => this.log(`Fetched universities`)),
			// 	catchError(this.handleError('getUniversities', []))
			// );
			/*
			.subscribe(
				result => {
					console.log('sendWebServiceRequest() : Success! : result is', result);
					console.log(`sendWebServiceRequest() : Best row, column are [${result.bestRow}, ${result.bestColumn}]`);
					console.log('sendWebServiceRequest() : Best score is', result.bestScore);
				},
				error => {
					console.error('sendWebServiceRequest() : Failure. : error is', error);
				}
			);
			*/
	}

	getTest() {
		/*
		//return this.getUrl()
		//	.switchMap(universitiesUrl => this.http.get<University[]>(universitiesUrl))
		this.http.get<any>('http://localhost:3000/tictactoe/EEEEXEEEE/3')
			// .switchMap(universities => Observable.of(universities.sort((a, b) => a.id - b.id)))
			// .pipe(
			// 	tap(universities => this.log(`Fetched universities`)),
			// 	catchError(this.handleError('getUniversities', []))
			// );
			.subscribe(
				result => {
					console.log('getTest() : Success! : result is', result);
				},
				error => {
					console.error('getTest() : Failure. : error is', error);
				}
			);
		*/
		this.automatedMove();
	}

	getImgSrc(squareId: number): string {
		const playerName = PlayerNames[this.aBoardImageNumbers[squareId]] || 'empty';

		return `src/assets/images/${playerName}.png`;
	}

	onClickSquare(squareId: number) {
		console.log(`Square ${squareId} clicked.`);

		if (this.aBoardImageNumbers[squareId] !== EmptyNumber) {
			return;
		}

		this.aBoardImageNumbers[squareId] = XNumber;
		this.boardPopulation[XNumber]++;

		if (this.boardPopulation[XNumber] + this.boardPopulation[ONumber] < nBoardArea) {
			this.automatedMove().
				subscribe(result => {
					console.log('sendWebServiceRequest() : Success! : result is', result);
					console.log(`sendWebServiceRequest() : Best row, column are [${result.bestRow}, ${result.bestColumn}]`);
					console.log('sendWebServiceRequest() : Best score is', result.bestScore);

					if (result && result.bestRow >= 0 && result.bestRow < nBoardHeight && result.bestColumn >= 0 && result.bestColumn < nBoardWidth) {
						this.aBoardImageNumbers[result.bestRow * nBoardWidth + result.bestColumn] = ONumber;
						this.boardPopulation[ONumber]++;
					}
				},
				error => {
					console.error('sendWebServiceRequest() : Failure. : error is', error);
				});
		}
	}

	onClickNewGame() {
		this.boardPopulation = [0, 0];
		this.aBoardImageNumbers = [
			EmptyNumber, EmptyNumber, EmptyNumber,
			EmptyNumber, EmptyNumber, EmptyNumber,
			EmptyNumber, EmptyNumber, EmptyNumber
		];
		this.numberOfCurrentPlayer = XNumber;
	}

	automatedMove(): Observable<any> {
		const boardString = this.aBoardImageNumbers.map(n => {

			if (n === XNumber) {
				return 'X';
			} else if (n === ONumber) {
				return 'O';
			} else {
				return 'E';
			}
		}).join('');

		return this.sendWebServiceRequest(boardString, this.PlayerPly[this.numberOfCurrentPlayer]);
	}
}


