import { Component, OnInit, ChangeDetectorRef }		from '@angular/core';

import { University }        						from '../../models/university';
import { UniversityService } 						from '../../services/university/university.service';

@Component({
	selector: 'app-my-universities',
	templateUrl: './universities.component.html',
	styleUrls: [ './universities.component.css' ]
})
export class UniversitiesComponent implements OnInit {
	universities: University[] = [];

	constructor(private changeDetectorRef: ChangeDetectorRef,
		private universityService: UniversityService) { }

	ngOnInit(): void {
		this.getUniversities();
	}

	getUniversities(): void {
		this.universityService
			.getUniversities()
			.subscribe(universities => {
				this.universities = universities;
				this.changeDetectorRef.detectChanges();			// !!! This is necessary.
			});
	}

	add(fullName: string, shortName: string): void {
		fullName = fullName.trim();
		shortName = shortName.trim();

		if (!fullName || !shortName) {
			return;
		}

		const ids = this.universities.map(university => university.id);
		let id = 0;
		let i = 1;

		while (id === 0) {

			if (ids.indexOf(i) < 0) {
				id = i;
			} else {
				i++;
			}
		}

		console.log('Adding a university with id', id, ', fullName', fullName, ', shortName', shortName);

		this.universityService.addUniversity(id, fullName, shortName)
			.subscribe(university => {
				this.universities.push(university);
				this.universities.sort((a, b) => a.id - b.id);
			});
	}

	delete(university: University): void {
		this.universities = this.universities.filter(u => u !== university);
		// this.universityService.deleteUniversity(university).subscribe();
		this.universityService.deleteUniversity(university.id).subscribe();
	}
}
