import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { Observable }               from 'rxjs/Observable';
import { Subject }                  from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// import { UniversitySearchService }  from '../../services/university-search/university-search.service';
import { UniversityService }		from '../../services/university/university.service';
import { University }               from '../../models/university';

@Component({
	selector: 'app-university-search',
	templateUrl: './university-search.component.html',
	styleUrls: [ './university-search.component.css' ],
	providers: [UniversityService]
})
export class UniversitySearchComponent implements OnInit {
	universities: Observable<University[]>;
	private searchTerms = new Subject<string>();

	constructor(
		private universityService: UniversityService,
		private router: Router) {}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.universities = this.searchTerms
			.debounceTime(300)        // wait 300ms after each keystroke before considering the term
			.distinctUntilChanged()   // ignore if next search term is same as previous
			.switchMap(term => term   // switch to new observable each time the term changes
				// return the http search observable
				// ? this.universitySearchService.search(term)
				? this.universityService.searchUniversities(term)
				// or the observable of empty universities if there was no search term
				: Observable.of<University[]>([]))
			.catch(error => {
				// TODO: add real error handling
				console.log(error);
				return Observable.of<University[]>([]);
			});
	}

	gotoUniversityDetail(university: University): void {
		const link = ['/university', university.id];

		this.router.navigate(link);
	}
}
