import { Component
	// , OnInit
	// , ChangeDetectorRef
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-observable-demo',
	templateUrl: './observable-demo.component.html',
	styleUrls: [ './observable-demo.component.css' ]
})
export class ObservableDemoComponent /* implements OnInit */ {
	items: Observable<string[]> = Observable.of([
		'one',
		'two',
		'three',
		'four'
	]);

	constructor( // private changeDetectorRef: ChangeDetectorRef
	) {
	}

	// If *ngFor does not respond correctly to changes in the array to which it refers, then call changeDetectorRef.detectChanges()
	// See https://angular.io/api/core/ChangeDetectorRef

	// When chaining RxJS observables: In genral, prefer switchMap() over flatMap() / mergeMap()
	// See https://javascript.tutorialhorizon.com/2017/03/29/switchmap-vs-flatmap-rxjs/

	// ngOnInit(): void {
	// }
}
