import { Component, ElementRef, OnInit, ViewChild, Inject, Input } from "@angular/core";
import { TextField } from 'ui/text-field';
import * as socialShare from 'nativescript-social-share';
import { Observable, Observer } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state'
import {Grocery, GroceryService, AddGroceryAction, RemoveGroceryAction} from './shared'

import { GroceryInputComponent } from './grocery-input';

@Component({
    moduleId: module.id,
    selector: 'groceries',
    templateUrl: 'groceries.component.html',
    styleUrls: [
        'groceries-common.css',
        'groceries.component.css'
    ],
    providers: [
        GroceryService
    ]
})
export class GroceriesComponent implements OnInit {

    groceries: Observable<Grocery[]>
    isLoading = false

    @ViewChild(GroceryInputComponent) groceryInput: GroceryInputComponent


    constructor(private groceryService: GroceryService, public store: Store<AppState>) { }

    ngOnInit() {
        this.isLoading = true
        this.groceries = this.store.select(state => state.groceries)

        this.groceryService.load()
            .do(() => this.isLoading = false)
            .subscribe()
    }

    add(grocery) {
        if (grocery.trim() === '') {
            alert('Enter a grocery item')
            return
        }

        this.groceryService
            .add(grocery)
            .do(() => this.groceryInput.clear())
            .subscribe()
    }

    onDelete(grocery: Grocery) {
        this.groceryService
            .delete(grocery.id)
            .subscribe()
    }

    onToggle(grocery: Grocery) {

        switch (grocery.status) {
            case 'pending':
                this.groceryService
                    .complete(grocery)
                    .subscribe()
                break;

            default:
                this.groceryService
                    .undo(grocery)
                    .subscribe()
                break;
        }
    }

    share() {
        console.log('share')
        this.groceries
            .map(groceries => groceries.map(row => row.name).join(', ').trim())
            .do(listString => console.log('mapped successfully', listString))
            .do(listString => socialShare.shareText(listString))
            .subscribe()
            .unsubscribe()


    }
}