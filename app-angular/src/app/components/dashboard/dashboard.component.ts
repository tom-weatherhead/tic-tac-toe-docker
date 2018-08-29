import { Component, OnInit /*, ChangeDetectorRef */ }		from '@angular/core';

import { HttpClient /*, HttpHeaders */ }			from '@angular/common/http';

//import { Observable }								from 'rxjs/Observable';

//import { University }								from '../../models/university';
// import { UniversitySearchComponent }				from '../university-search/university-search.component';
//import { UniversityService }						from '../../services/university/university.service';

// const httpOptions = {
// 	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
	//universities: University[] = [];

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

	/** GET universities from the vt-server */
	getTest() {
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
	}
}
