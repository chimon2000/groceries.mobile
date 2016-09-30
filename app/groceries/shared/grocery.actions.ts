import { Action } from '@ngrx/store';
import { Grocery } from './grocery';

export const GroceryActions = {
    AddGrocery: 'AddGrocery',
    UpdateGrocery: 'UpdateGrocery',
    LoadGroceries: 'LoadGroceries',
    RemoveGrocery: 'RemoveGrocery'
}

export class AddGroceryAction implements Action {
    type = GroceryActions.AddGrocery
    constructor(public payload: Grocery) { }
}

export class UpdateGroceryAction implements Action {
    type = GroceryActions.UpdateGrocery
    constructor(public payload: Grocery) { }
}

export class LoadGroceriesAction implements Action {
    type = GroceryActions.LoadGroceries
    constructor(public payload: Grocery[]) { }
}

export class RemoveGroceryAction {
    type = GroceryActions.RemoveGrocery
    constructor(public payload?: { id: string }) { }
}