import { Component, ChangeDetectorRef }     from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                         from '@angular/common';

// import { Observable }                       from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { University }                       from '../../models/university';
import { UniversityService }                from '../../services/university/university.service';

@Component({
	selector: 'app-university-chart',
	templateUrl: './university-chart.component.html' /* ,
	styleUrls: [ './university-chart.component.css' ] */
})
export class UniversityChartComponent /* implements OnInit */ {
	showChart = false;
	public chartOptions: any;
	public chartLabels: string[];
	public chartType: string;
	public chartLegend: boolean;
	public chartData: any[];
	// private _opened: boolean = false;

	raceLabels: string[] = [
		'White',
		'Black',
		'Hispanic',
		'Asian',
		'Am Native',
		'Pac Islander',
		'Multiple',
		'Alien',
		'Unknown'
	];

	constructor(private changeDetectorRef: ChangeDetectorRef,
		private universityService: UniversityService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		// Placing this call to loadDataAndDisplayIt() in one of the Angular lifecycle functions
		// (ngOnInit, etc.) instead of in the constructor does not seem to work.
		this.loadDataAndDisplayIt();
	}

	// ngOnInit(): void {
	// }

	// private _toggleSidebar() {
		// this._opened = !this._opened;
	// }

	calculatePercentUnknownRace(university: University): number {
		let percentUnknown = 100.0
			- university.percentWhite
			- university.percentBlack
			- university.percentHispanic
			- university.percentAsian
			- university.percentAmericanNative
			- university.percentPacificIslander
			- university.percentMultipleRaces
			- university.percentNonResidentAlien;

		if (percentUnknown < 0.0) {
			percentUnknown = 0.0;
		}

		// ThAW TODO 2017-11-17 : Is there a Math.floor() function in TypeScript / JavaScript ?
		percentUnknown = (percentUnknown * 100.0 + 0.5) / 100.0;
		return percentUnknown;
	}

	createDefaultChartSettings(universities: University[]): any {
		return {
			labels: universities.map(university => university.shortName),
			type: 'pie',
			data: universities.map(university => university.funk)
		};
	}

	createRaceBarChartSettings(university: University): any {
		return {
			options: {
				scaleShowVerticalLines: false,
				responsive: true
			},
			labels: this.raceLabels,
			type: 'bar',
			legend: true,
			data: [
				{
					data: [
						university.percentWhite,
						university.percentBlack,
						university.percentHispanic,
						university.percentAsian,
						university.percentAmericanNative,
						university.percentPacificIslander,
						university.percentMultipleRaces,
						university.percentNonResidentAlien,
						this.calculatePercentUnknownRace(university)
					],
					label: 'Race!'
				}
			]
		};
	}

	createRacePieChartSettings(university: University): any {
		return {
			labels: this.raceLabels,
			type: 'pie',
			data: [
				university.percentWhite,
				university.percentBlack,
				university.percentHispanic,
				university.percentAsian,
				university.percentAmericanNative,
				university.percentPacificIslander,
				university.percentMultipleRaces,
				university.percentNonResidentAlien,
				this.calculatePercentUnknownRace(university)
			]
		};
	}

	createUndergradPopulationsBarChartSettings(universities: University[]): any {
		return {
			options: {
				scaleShowVerticalLines: false,
				responsive: true
			},
			labels: universities.map(university => university.shortName),
			// type: 'bar',
			type: 'barAllU',
			legend: true,
			data: [
				{
					data: universities.map(university => university.numUndergraduateStudents),
					label: 'Undergrads'
				}
			]
		};
	}

	clone(data: any): any {
		return JSON.parse(JSON.stringify(data));
	}

	loadDataAndDisplayIt(): void {
		this.universityService.getUniversities().subscribe(universities => {
			this.route.paramMap
				// .switchMap((params: ParamMap) => Observable.of(+params.get('id')))
				// .subscribe((chartID: number) => {
				.subscribe((params: ParamMap) => {
					// let chartID: number = parseInt(params.get('id'));
					const chartID: number = +params.get('id');
					let chartSettings; // = this.createDefaultChartSettings(universities);

					if (chartID > 0 && chartID <= universities.length) {
						chartSettings = this.createRaceBarChartSettings(universities[chartID - 1]);
					} else if (chartID > universities.length && chartID <= 2 * universities.length) {
						chartSettings = this.createRacePieChartSettings(universities[chartID - universities.length - 1]);
					} else {
						chartSettings = this.createUndergradPopulationsBarChartSettings(universities);
					}

					this.showChart = false;

					const oldChartType = this.chartType;

					this.chartOptions = chartSettings.options;
					this.chartLabels = chartSettings.labels;
					// this.chartLabels = this.clone(chartSettings.labels);
					this.chartType = chartSettings.type;
					this.chartLegend = chartSettings.legend;

					if (oldChartType === 'pie' && this.chartType === 'pie') {
						let clone = JSON.parse(JSON.stringify(this.chartData));

						clone = chartSettings.data;

						this.chartData = clone;
					} else {
						this.chartData = chartSettings.data;
					}

					this.showChart = true;
					this.changeDetectorRef.detectChanges();			// !!! This is necessary.
				});
			});
	}

	goBack(): void {
		this.location.back();
	}

	// Events:

	public goToChart(chartID: number): void {
		this.router.navigate(['/charts', chartID]);
	}

	public chartClicked(e: any): void {
		console.log(e);

		if (e.active && e.active.length) {
			console.log(e.active[0]);
			// For a multi-university chart, go to the details page for university/(id = e.active[0].index)
		}
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	/* public randomize(): void {
		// Only Change 3 values
		let data = [
		Math.round(Math.random() * 100),
		59,
		80,
		(Math.random() * 100),
		56,
		(Math.random() * 100),
		40];
		let clone = JSON.parse(JSON.stringify(this.barChartData));
		clone[0].data = data;
		this.barChartData = clone; */
		/**
		* (My guess), for Angular to recognize the change in the dataset
		* it has to change the dataset variable directly,
		* so one way around it, is to clone the data, change it and then
		* assign it;
		*/
	// }
}
