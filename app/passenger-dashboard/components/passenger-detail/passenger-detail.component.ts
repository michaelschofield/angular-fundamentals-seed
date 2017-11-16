import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template: `
        <ul>
            <li>
                <span class="status" [ngClass]="{ 'checked-in': detail.checkedIn }"></span>

                <div *ngIf="editing">
                    <input type="text" 
                           (input)="onNameChange(name.value)"
                           [value]="detail.fullname" 
                           #name>
                </div>
                
                <div *ngIf="!editing">
                    {{ detail.fullname }}
                </div>

                <p>{{ detail | json }}</p>

                <div class="date">
                    Check in date:
                    {{ detail.checkedInDate | date: 'yMMMMd' | uppercase }}
                </div>

                <div class="children">
                    Children: {{ detail.children?.length || 0 }}
                </div>
                
                <button (click)="toggleEdit()">
                    {{ editing ? 'Done' : 'Edit' }}
                </button>
                
                <button (click)="onRemove()">
                    Remove
                </button>
                
                <button (click)="goToPassenger()">View</button>

            </li>
        </ul>
    `,
})

export class PassengerDetailComponent implements OnChanges {
    @Input()
        detail: Passenger;

    editing: boolean = false;

    @Output()
        edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    @Output()
        remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    @Output() view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    constructor() {}

    ngOnChanges(changes) {
        if (changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue);
        }
    }

    goToPassenger() {
        this.view.emit(this.detail);
    }

    onNameChange(value: string) {
        this.detail.fullname = value;
    }

    onRemove() {
        this.remove.emit(this.detail);
    }

    toggleEdit() {
        if (this.editing) {
            this.edit.emit(this.detail);
        }
        this.editing = !this.editing;
    }
}