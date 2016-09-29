import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Grocery } from '../shared';
import { registerElement } from "nativescript-angular/element-registry";

registerElement("CheckBox", () => require("nativescript-checkbox").CheckBox);

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
    @Output() toggleGrocery = new EventEmitter()

    constructor() { }

    ngOnInit() { }

    onDelete(grocery: Grocery) {
        this.deleteGrocery.emit(grocery)
    }

    onToggle(grocery: Grocery) {
        this.toggleGrocery.emit(grocery)
    }
}