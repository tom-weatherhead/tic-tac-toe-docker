import { NgModule }							from '@angular/core';
import { BrowserModule }					from '@angular/platform-browser';
import { FormsModule }						from '@angular/forms';
import { HttpClientModule }					from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule }	from 'angular-in-memory-web-api';
// import { InMemoryDataService }			from '../services/in-memory-data/in-memory-data.service';

//import { ChartsModule }						from 'ng2-charts';

import { SidebarModule }					from 'ng-sidebar';

import { AppRoutingModule }					from './app-routing.module';

import { ConfigService }					from '../services/config/config.service';
import { MessageService }					from '../services/message/message.service';
// import { HeroService }					from '../services/hero/hero.service';
//import { UniversityService }				from '../services/university/university.service';

import { AppComponent }						from '../components/app/app.component';
import { DashboardComponent }				from '../components/dashboard/dashboard.component';

// import { HeroDetailComponent }			from '../components/hero-detail/hero-detail.component';
// import { HeroesComponent }				from '../components/heroes/heroes.component';
// import { HeroSearchComponent }			from '../components/hero-search/hero-search.component';

// import { UniversitiesComponent }			from '../components/universities/universities.component';
// import { UniversityChartComponent }			from '../components/university-chart/university-chart.component';
// import { UniversityDetailComponent }		from '../components/university-detail/university-detail.component';
// import { UniversitySearchComponent }		from '../components/university-search/university-search.component';

// import { SidebarTestComponent }				from '../components/sidebar-test/sidebar-test.component';

import { MessagesComponent }				from '../components/messages/messages.component';

// import { ObservableDemoComponent }        from '../components/observable-demo/observable-demo.component';

import { ConfigComponent }					from '../components/config/config.component';

// import { TestComponent }					from '../components/sidebar-test/sidebar-test.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		//ChartsModule,
		SidebarModule.forRoot()

		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses.
		// Remove it when a real server is ready to receive requests.
		// HttpClientInMemoryWebApiModule.forRoot(
		// InMemoryDataService, { dataEncapsulation: false }
		// )
	],
	declarations: [
		AppComponent,
		DashboardComponent,
		MessagesComponent,
		// HeroesComponent,
		// HeroDetailComponent,
		// HeroSearchComponent,
		// UniversitiesComponent,
		// UniversityChartComponent,
		// UniversityDetailComponent,
		// UniversitySearchComponent,
		// SidebarTestComponent,
		// ObservableDemoComponent.
		ConfigComponent
	],
	providers: [
		// HeroService,
		// UniversityService,
		MessageService,
		ConfigService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
