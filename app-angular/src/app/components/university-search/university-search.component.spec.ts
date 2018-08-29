import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router }                   from '@angular/router';

import { UniversitySearchComponent } from './university-search.component';

describe('UniversitySearchComponent', () => {
	let component: UniversitySearchComponent;
	let fixture: ComponentFixture<UniversitySearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UniversitySearchComponent ] // ,
			// providers: [ Router ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UniversitySearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
