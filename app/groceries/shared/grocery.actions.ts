import { Action } from '@ngrx/store';

export const GroceryActions = {
    AddGroceryAction: 'AddGroceryAction',
    AddGroceriesAction: 'AddGroceriesAction',
    LoadGroceriesAction: 'LoadGroceriesAction',
    LoadGroceriesSuccessAction: 'LoadGroceriesSuccessAction',
    RemoveGroceryAction: 'RemoveGroceryAction'
}

export class AddGroceryAction implements Action {
    type = GroceryActions.AddGroceryAction
    constructor(public payload?: { id: string, name: string }) { }
}

export class AddGroceriesAction implements Action {
    type = GroceryActions.AddGroceriesAction
    constructor(public payload?: { id: string, name: string }[]) { }
}

export class LoadGroceriesAction implements Action {
    type = GroceryActions.LoadGroceriesAction
}

export class LoadGroceriesSuccessAction implements Action {
    type = GroceryActions.LoadGroceriesSuccessAction
    constructor(public payload?: { id: string, name: string }[]) { }
}

export class RemoveGroceryAction {
    type = GroceryActions.RemoveGroceryAction
    constructor(public payload?: { id: string }) { }
}