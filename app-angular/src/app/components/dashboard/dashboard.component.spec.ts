import { async, ComponentFixture, TestBed }			from '@angular/core/testing';
import { HttpClient, HttpHandler }					from '@angular/common/http';
// import { RouterModule, Routes }					from '@angular/router';
// import { Router }									from '@angular/router';

import { ConfigService }							from '../../services/config/config.service';
import { MessageService }							from '../../services/message/message.service';

import { DashboardComponent }						from './dashboard.component';
// import { UniversitySearchComponent }				from '../university-search/university-search.component';

// TODO: TomW 2018-05-21 : Instead of using the real UniversityService, use a mock of UniversityService that does not send any real HTTP
// requests; it should contain a getUniversities() method that returns fake, hard-coded data.
import { UniversityService }						from '../../services/university/university.service';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			// declarations: [ DashboardComponent, UniversitySearchComponent ],
			declarations: [ DashboardComponent ],
			// providers: [ HttpClient, HttpHandler, Router, ConfigService, MessageService, UniversityService ]
			providers: [ HttpClient, HttpHandler, ConfigService, MessageService, UniversityService ]
			// TODO: providers: [ HttpClient, HttpHandler, ConfigService, MessageService, UniversityServiceMock ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
