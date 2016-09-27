import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TextField } from 'ui/text-field';

@Component({
    moduleId: module.id,
    selector: 'grocery-input',
    templateUrl: 'grocery-input.component.html',
    styleUrls: [
        'grocery-input.common.css',
        'grocery-input.component.css',
    ]
})
export class GroceryInputComponent implements OnInit {
    @Input() grocery: string = ''
    @Output() addGrocery = new EventEmitter()

    @ViewChild('groceryTextField') groceryTextField: ElementRef

    constructor() { }

    ngOnInit() { }

    add(grocery) {
        
        let textField = <TextField>this.groceryTextField.nativeElement
        textField.dismissSoftInput()

        this.addGrocery.emit(grocery)
    }

    clear() {
        this.grocery = ''
    }
}