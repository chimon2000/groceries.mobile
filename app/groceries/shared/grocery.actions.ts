import { Action } from '@ngrx/store';
import { Grocery } from './grocery';

export const GroceryActions = {
    AddGroceryAction: 'AddGroceryAction',
    UpdateGroceryAction: 'UpdateGroceryAction',
    LoadGroceriesAction: 'LoadGroceriesAction',
    LoadGroceriesSuccessAction: 'LoadGroceriesSuccessAction',
    RemoveGroceryAction: 'RemoveGroceryAction'
}

export class AddGroceryAction implements Action {
    type = GroceryActions.AddGroceryAction
    constructor(public payload: Grocery) { }
}

export class UpdateGroceryAction implements Action {
    type = GroceryActions.UpdateGroceryAction
    constructor(public payload: Grocery) { }
}

export class LoadGroceriesAction implements Action {
    type = GroceryActions.LoadGroceriesAction
    constructor(public payload: Grocery[]) { }
}

export class LoadGroceriesSuccessAction implements Action {
    type = GroceryActions.LoadGroceriesSuccessAction
    constructor(public payload?: { id: string, name: string }[]) { }
}

export class RemoveGroceryAction {
    type = GroceryActions.RemoveGroceryAction
    constructor(public payload?: { id: string }) { }
}