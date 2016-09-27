import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Grocery } from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'grocery-list',
    templateUrl: 'grocery-list.component.html',
    styleUrls: [
        'grocery-list.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class GroceryListComponent implements OnInit {
    @Input() groceries: Grocery[] = []
    @Output() deleteGrocery = new EventEmitter()

    constructor() { }

    ngOnInit() { }

    onDelete(grocery: Grocery) {
        this.deleteGrocery.emit(grocery)
    }
}