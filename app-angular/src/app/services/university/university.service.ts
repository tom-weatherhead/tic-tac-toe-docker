import { Injectable }                       from '@angular/core';
import { HttpClient, HttpHeaders }			from '@angular/common/http';

// import { Observable }                       from 'rxjs';
import { Observable }						from 'rxjs/Observable';
import { of }								from 'rxjs/observable/of';
import { catchError, map, tap }				from 'rxjs/operators';

import { MessageService }					from '../message/message.service';

import { University }                       from '../../models/university';

import { /* Config, */ ConfigService }		from '../../services/config/config.service';

// TomW 2018-03-06 : Deleted angular-in-memory-web-api from package.json
//    "angular-in-memory-web-api": "~0.5.0",

/*
https://angular.io/api/common/http/HttpClient

import { HttpClient } from '@angular/common/http';

class HttpClient {
  constructor(handler: HttpHandler)
  request(first: string | HttpRequest<any>, url?: string, options: {...}): Observable<any>
  delete(url: string, options: {...}): Observable<any>
  get(url: string, options: {...}): Observable<any>
  head(url: string, options: {...}): Observable<any>
  jsonp<T>(url: string, callbackParam: string): Observable<T>
  options(url: string, options: {...}): Observable<any>
  patch(url: string, body: any | null, options: {...}): Observable<any>
  post(url: string, body: any | null, options: {...}): Observable<any>
  put(url: string, body: any | null, options: {...}): Observable<any>
}
*/

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UniversityService {
	private universitiesUrl;

	constructor(
		private configService: ConfigService,
		private http: HttpClient,
		private messageService: MessageService) {
	}

	getUrl(): Observable<string> {

		if (this.universitiesUrl) {
			return Observable.of(this.universitiesUrl);
		}

		return this.configService.getConfig()
			// Clone the data object, using its known Config shape
			.switchMap(data => {
				const config = { ...data };

				console.log('Config from service:', config);

				this.universitiesUrl = config.serviceURLs.university;

				console.log('universitiesUrl:', this.universitiesUrl);

				return Observable.of(this.universitiesUrl);
			});
	}

	/** GET universities from the vt-server */
	getUniversities (): Observable<University[]> {
		return this.getUrl()
			.switchMap(universitiesUrl => this.http.get<University[]>(universitiesUrl))
			.switchMap(universities => Observable.of(universities.sort((a, b) => a.id - b.id)))
			.pipe(
				tap(universities => this.log(`Fetched universities`)),
				catchError(this.handleError('getUniversities', []))
			);
	}

	/** GET university by id. Return `undefined` when id not found */
	// getUniversityNo404<Data>(id: number): Observable<University> {
	getUniversityNo404(id: number): Observable<University> {
		return this.getUrl()
			.switchMap(universitiesUrl => this.http.get<University>(`${universitiesUrl}/${id}`))
			.pipe(
				map(universities => universities[0]), // returns a {0|1} element array
				tap(h => {
					const outcome = h ? `Fetched` : `Did not find`;
					this.log(`${outcome} university id=${id}`);
				}),
				catchError(this.handleError<University>(`getUniversity id=${id}`))
			);
	}

	/** GET university by id. Will 404 if id not found */
	getUniversity(id: number): Observable<University> {
		return this.getUrl()
			.switchMap(universitiesUrl => this.http.get<University>(`${universitiesUrl}/${id}`))
			.pipe(
				tap(_ => this.log(`Fetched university id=${id}`)),
				catchError(this.handleError<University>(`getUniversity id=${id}`))
			);
	}

	/* GET universities whose name contains search term */
	searchUniversities(term: string): Observable<University[]> {

		if (!term.trim()) {
			// If there is no search term, return an empty University array.
			return of([]);
		}

		return this.getUrl()
			.switchMap(universitiesUrl => this.http.get<University[]>(`${universitiesUrl}/?name=${term}`))
			.pipe(
				tap(_ => this.log(`Found universities matching "${term}"`)),
				catchError(this.handleError<University[]>('searchUniversities', []))
			);
	}

	//////// Save methods //////////

	/** POST: add a new university to the server */
	// addUniversity (university: University): Observable<University> {
	addUniversity(id: number, fullName: string, shortName: string): Observable<University> {
		const universityBeforePost = {
			id: id,
			name: fullName,
			shortName: shortName,
			numUndergraduateStudents: 24191,
			percentWhite: 69.67,
			percentBlack: 3.6,
			percentHispanic: 5.3,
			percentAsian: 9.19,
			percentAmericanNative: 0.15,
			percentPacificIslander: 0.13,
			percentMultipleRaces: 4.29,
			percentNonResidentAlien: 4.51,
			percentUnknown: 3.15
		};

		return this.getUrl()
			.switchMap(universitiesUrl => this.http.post<University>(universitiesUrl, universityBeforePost, httpOptions))
			.pipe(
				tap((university: University) => this.log(`Added university with id=${university.id}`)),
				catchError(this.handleError<University>('addUniversity'))
			);
	}

	/** PUT: update the university on the server */
	updateUniversity (university: University): Observable<any> {
		return this.getUrl()
			.switchMap(universitiesUrl => this.http.put<University>(`${universitiesUrl}/${university.id}`, university, httpOptions))
			.pipe(
				tap(_ => this.log(`updated university id=${university.id}`)),
				catchError(this.handleError<any>('updateUniversity'))
			);
	}

	/** PATCH: update the university on the server */
	patchUniversity(id: number, changes: any): Observable<any> {
		return this.getUrl()
			.switchMap(universitiesUrl => this.http.put<University>(`${universitiesUrl}/${id}`, changes, httpOptions))
			.pipe(
				tap(_ => this.log(`updated university id=${id}`)),
				catchError(this.handleError<any>('patchUniversity'))
			);
	}

	/** DELETE: delete the university from the server */
	deleteUniversity (university: University | number): Observable<University> {
		const id = typeof university === 'number' ? university : university.id;
		return this.getUrl()
			.switchMap(universitiesUrl => this.http.delete<University>(`${universitiesUrl}/${id}`, httpOptions))
			.pipe(
				tap(_ => this.log(`Deleted university id=${id}`)),
				catchError(this.handleError<University>('deleteUniversity'))
			);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: Send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: A better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** Log a UniversityService message with the MessageService */
	private log(message: string) {
		this.messageService.add('UniversityService: ' + message);
	}
}

/*
private universities: University[] = [
	{
		id: 1,
		name: 'North Carolina State University at Raleigh',
		shortName: 'NCSU Raleigh',
		numUndergraduateStudents: 22925,
		percentWhite: 74.67,
		percentBlack: 6.5,
		percentHispanic: 4.47,
		percentAsian: 5.37,
		percentAmericanNative: 0.42,
		percentPacificIslander: 0.06,
		percentMultipleRaces: 3.51,
		percentNonResidentAlien: 3.27,
		percentUnknown: 1.72,
		funk: 1
	},
	{
		id: 2,
		name: 'Texas A & M University-College Station',
		shortName: 'Tx A&M Clg Stn',
		numUndergraduateStudents: 46941,
		percentWhite: 66.1,
		percentBlack: 2.78,
		percentHispanic: 20.68,
		percentAsian: 5.46,
		percentAmericanNative: 0.28,
		percentPacificIslander: 0.1,
		percentMultipleRaces: 3.08,
		percentNonResidentAlien: 1.31,
		percentUnknown: 0.22,
		funk: 2
	},
	{
		id: 3,
		name: 'The University of Texas at Austin',
		shortName: 'U T Austin',
		numUndergraduateStudents: 38914,
		percentWhite: 46.03,
		percentBlack: 4.13,
		percentHispanic: 21.92,
		percentAsian: 18.95,
		percentAmericanNative: 0.2,
		percentPacificIslander: 0.14,
		percentMultipleRaces: 3.46,
		percentNonResidentAlien: 4.68,
		percentUnknown: 0.49,
		funk: 3
	},
	{
		id: 4,
		name: 'Virginia Polytechnic Institute and State University',
		shortName: 'Virginia Tech',
		numUndergraduateStudents: 24191,
		percentWhite: 69.67,
		percentBlack: 3.6,
		percentHispanic: 5.3,
		percentAsian: 9.19,
		percentAmericanNative: 0.15,
		percentPacificIslander: 0.13,
		percentMultipleRaces: 4.29,
		percentNonResidentAlien: 4.51,
		percentUnknown: 3.15,
		funk: 5
	},
	{
		id: 5,
		name: 'University of Virginia-Main Campus',
		shortName: 'U Va Main',
		numUndergraduateStudents: 15515,
		percentWhite: 61.17,
		percentBlack: 6.19,
		percentHispanic: 6.09,
		percentAsian: 12.27,
		percentAmericanNative: 0.1,
		percentPacificIslander: 0.03,
		percentMultipleRaces: 4.55,
		percentNonResidentAlien: 5.0,
		percentUnknown: 4.6,
		funk: 8
	}
];
*/
