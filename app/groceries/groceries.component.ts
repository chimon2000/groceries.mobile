import { Component, ElementRef, OnInit, ViewChild, Inject, Input } from "@angular/core";
import { TextField } from 'ui/text-field';
import * as socialShare from 'nativescript-social-share';
import { Observable, Observer } from 'rxjs';
import {
    Grocery,
    GroceryService,
    Action,
    AddGroceryAction,
    RemoveGroceryAction
} from './shared'

import { AppState, state } from '../app.state'   

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

    groceries: Array<Grocery> = []
    isLoading = false

    @ViewChild(GroceryInputComponent) groceryInput: GroceryInputComponent


    constructor(private groceryService: GroceryService,
        @Inject(state) private state: Observable<AppState>) { }

    ngOnInit() {
        this.isLoading = true
        this.state.distinctUntilChanged()
            .subscribe(
            state => {
                this.groceries = state.groceries
            }
            )

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

    share() {
        let listString = this.groceries
            .map(row => row.name)
            .join(', ')
            .trim()

        socialShare.shareText(listString)
    }
}