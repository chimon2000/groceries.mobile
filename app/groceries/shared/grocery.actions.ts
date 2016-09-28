import { Action } from '@ngrx/store';

export const GroceryActions = {
    AddGroceryAction: 'AddGroceryAction',
    LoadGroceriesAction: 'LoadGroceriesAction',
    LoadGroceriesSuccessAction: 'LoadGroceriesSuccessAction',
    RemoveGroceryAction: 'RemoveGroceryAction'
}

export class AddGroceryAction implements Action {
    type = GroceryActions.AddGroceryAction
    constructor(public payload?: { id: string, name: string }) { }
}

export class LoadGroceriesAction implements Action {
    type = GroceryActions.LoadGroceriesAction
    constructor(public payload?: { id: string, name: string }[]) { }
}

export class LoadGroceriesSuccessAction implements Action {
    type = GroceryActions.LoadGroceriesSuccessAction
    constructor(public payload?: { id: string, name: string }[]) { }
}

export class RemoveGroceryAction {
    type = GroceryActions.RemoveGroceryAction
    constructor(public payload?: { id: string }) { }
}