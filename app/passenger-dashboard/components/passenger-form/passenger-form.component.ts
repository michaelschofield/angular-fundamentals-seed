import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";

@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
        <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>

            <div>
                Passenger name:
                <input name="fullname" 
                       [ngModel]="detail?.fullname"
                       #fullname="ngModel"
                       required
                       type="text">
                <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
                    Passenger name is required
                </div>
            </div>
            
            <div>
                Passenger id:
                <input name="id" 
                       #id="ngModel"
                       [ngModel]="detail?.id"
                       minlength="=0"
                       required
                       type="number">
                <div *ngIf="id.errors?.required && id.touched" class="error">
                    Passenger ID is required
                </div>
                <div *ngIf="id.errors?.rminlength && id.touched" class="error">
                    Passenger ID must have a length
                </div>
            </div>
            
            <div>
                <label>
                    <input name="checkedIn"
                           [ngModel]="detail?.checkedIn"
                           (ngModelChange)="toggleCheckIn($event)"
                           type="checkbox">
                </label>
            </div>
            
            <template [ngIf]="form.value.checkedIn">
                <div>
                    Check in date: 
                    <input name="checkedInDate"
                           [ngModel]="detail?.checkedInDate"
                           type="number">
                </div>
            </template>
            
            <div>
                Luggage:
                <select name="baggage" 
                        [ngModel]="detail?.baggage">
                    
                    <template ngFor let-item [ngForOf]="baggage">
                        <option [selected]="item.key === detail?.baggage" [value]="item.key">{{ item.value }}</option>
                    </template>
                    
                </select>
            </div>
            
            <button type="submit" [disabled]="form.invalid">
                Update passenger
            </button>            
        </form>
    `,
})

export class PassengerFormComponent {
    @Input() detail: Passenger;

    @Output() update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    baggage: Baggage[] = [{
        key: 'none',
        value: 'No baggage',
    }, {
        key: 'hand-only',
        value: 'Hand baggage',
    }, {
        key: 'hold-only',
        value: 'Hold baggage',
    }, {
        key: 'hand-hold',
        value: 'Hand and Hold baggage',
    }];

    handleSubmit(passenger: Passenger, isValid: boolean) {
        /**
         * This is a dumb component so it really shouldn't talk to an api
         */
        if (isValid) {
            this.update.emit(passenger);
        }
    }

    toggleCheckIn(checkedIn: boolean) {
        if (checkedIn) {
            this.detail.checkedInDate = Date.now();
        }
    }
}