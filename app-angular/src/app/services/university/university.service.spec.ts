import { TestBed, inject } from '@angular/core/testing';

import { UniversityService } from './university.service';

// TODO TomW 2018-05-20 : Use a mock, or something like a mock, instead of allowing the actual UniversityService
// to send HTTP requests to the Web service.

describe('UniversityService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UniversityService]
		});
	});

	it('should be created', inject([UniversityService], (service: UniversityService) => {
		expect(service).toBeTruthy();
	}));
});
