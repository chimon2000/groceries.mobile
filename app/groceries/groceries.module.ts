import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { NativeScriptModule } from "nativescript-angular/platform"
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { GroceriesComponent }   from './groceries.component';
import { GroceryListComponent } from './grocery-list';
import { GroceryInputComponent } from './grocery-input';
import { GroceriesRoutes } from './groceries.routes';
import { groceriesReducer } from './shared';
import { Store, StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        GroceriesRoutes,
        StoreModule.provideStore({ groceries: groceriesReducer }, { groceries: [] })
    ],
    declarations: [
        GroceriesComponent,
        GroceryListComponent,
        GroceryInputComponent
    ]
})
export class GroceriesModule { }
