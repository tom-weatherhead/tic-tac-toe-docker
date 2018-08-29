import { Component, ChangeDetectorRef }	from '@angular/core';
import { ActivatedRoute, ParamMap }		from '@angular/router';
import { Location }						from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { University }					from '../../models/university';
import { UniversityService }			from '../../services/university/university.service';

@Component({
	selector: 'app-university-detail',
	templateUrl: './university-detail.component.html',
	styleUrls: [ './university-detail.component.css' ]
})
export class UniversityDetailComponent /* implements OnInit, AfterViewInit */ {
	university: University;

	constructor(private changeDetectorRef: ChangeDetectorRef,
		private universityService: UniversityService,
		private route: ActivatedRoute,
		private location: Location
	) {
		this.loadDataAndDisplayIt();
	}

	// ngOnInit(): void {
	// }

	loadDataAndDisplayIt(): void {
		this.route.paramMap
			// Note: the + in front of params.get('id') converts the ID from a string to an int.
			.switchMap((params: ParamMap) => this.universityService.getUniversity(+params.get('id')))
			.subscribe(university => {
				this.university = university;
				this.changeDetectorRef.detectChanges();			// !!! This is necessary.
			});
	}

	goBack(): void {
		this.location.back();
	}

	// save(): void {
	// Update the University object on the server by sending the entire object to the server.
	// 	this.universityService.updateUniversity(this.university)
	// 		.subscribe(() => this.goBack());
	// }

	save(): void {
		// Update the University object on the server by sending just the changes to the server.
		this.universityService.patchUniversity(this.university.id, { name: this.university.name })
			.subscribe(() => this.goBack());
	}
}
