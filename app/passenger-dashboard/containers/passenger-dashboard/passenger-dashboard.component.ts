import { Component, OnInit } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { PassengerDashboardService } from "../../passenger-dashboard.service";
import { Router } from "@angular/router";

@Component({
    selector: 'passenger-dashboard',
    styleUrls: ['passenger-dashboard.component.scss'],
    template: `
        <div>
            <passenger-count [items]="passengers"></passenger-count>
            <passenger-detail 
                    *ngFor="let passenger of passengers" 
                    [detail]="passenger"
                    (view)="handleView($event)"
                    (edit)="handleEdit($event)"
                    (remove)="handleRemove($event)">
            </passenger-detail>
        </div>
    `,
})

export class PassengerDashboardComponent implements OnInit {

    passengers: Passenger[];

    constructor(
        private router: Router,
        private passengerService: PassengerDashboardService
    ) {}

    ngOnInit() {
        this.passengerService
            .getPassengers()
            .subscribe((data: Passenger[]) => this.passengers = data);
    }

    handleEdit(event: Passenger) {
        this.passengerService
            .updatePassenger(event)
            .subscribe((data: Passenger) => {
                this.passengers = this.passengers.map((passenger: Passenger) => {
                    if (passenger.id === passenger.id) {
                        passenger = Object.assign({}, passenger, event);
                    }
                    return passenger;
                });
            });
    }

    handleRemove(event: Passenger) {
        this.passengerService
            .removePassenger(event)
            .subscribe((data: Passenger) => {
                this.passengers = this.passengers.filter((passenger: Passenger) => passenger.id !== event.id);
            });
    }

    handleView(event: Passenger) {
        this.router.navigate(['/passengers', event.id])
    }
}