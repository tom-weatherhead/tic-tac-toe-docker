import { NgModule }             		    from '@angular/core';
import { RouterModule, Routes } 		    from '@angular/router';

import { DashboardComponent }   		    from '../components/dashboard/dashboard.component';
// import { HeroesComponent }      		from '../components/heroes/heroes.component';
// import { HeroDetailComponent }  		from '../components/hero-detail/hero-detail.component';
// import { UniversitiesComponent }      	from '../components/universities/universities.component';
// import { UniversityDetailComponent }	  from '../components/university-detail/university-detail.component';
// import { UniversityChartComponent }		  from '../components/university-chart/university-chart.component';
// import { SidebarTestComponent }         from '../components/sidebar-test/sidebar-test.component';
// import { ObservableDemoComponent }        from '../components/observable-demo/observable-demo.component';
import { ConfigComponent }              from '../components/config/config.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard',			component: DashboardComponent },
	// { path: 'detail/:id',			component: HeroDetailComponent },
	// { path: 'heroes',				component: HeroesComponent },
	// { path: 'universities',		component: UniversitiesComponent },
	// { path: 'university/:id',		component: UniversityDetailComponent },
	// { path: 'charts/:id',			component: UniversityChartComponent },
	// { path: 'sidebar-test',		component: SidebarTestComponent }
	// , { path: 'observable-demo',		component: ObservableDemoComponent }
	{ path: 'config',		component: ConfigComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
