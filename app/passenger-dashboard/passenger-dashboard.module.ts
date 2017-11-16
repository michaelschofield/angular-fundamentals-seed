import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PassengerCountComponent } from "./components/passenger-count/passenger-count.component";
import { PassengerDashboardComponent } from "./containers/passenger-dashboard/passenger-dashboard.component";
import { PassengerDetailComponent } from "./components/passenger-detail/passenger-detail.component";
import { PassengerFormComponent } from "./components/passenger-form/passenger-form.component";
import { PassengerViewerComponent } from "./containers/passenger-viewer/passenger-viewer.component";

import { PassengerDashboardService } from "./passenger-dashboard.service";

const routes: Routes = [
    {
        path: 'passengers',
        children: [
            {
                path: '',
                component: PassengerDashboardComponent,
            },
            {
                path: ':id',
                component: PassengerViewerComponent
            }
        ],
    }
];

@NgModule({
    // Holds all of the components relative to this module
    declarations: [
        PassengerCountComponent,
        PassengerDashboardComponent,
        PassengerDetailComponent,
        PassengerFormComponent,
        PassengerViewerComponent,
    ],

    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(routes)
    ],

    providers: [
        PassengerDashboardService,
    ],
})

export class PassengerDashboardModule {}