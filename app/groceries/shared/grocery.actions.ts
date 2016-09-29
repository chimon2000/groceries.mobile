import { Action } from '@ngrx/store';

export const GroceryActions = {
    AddGrocery: 'AddGrocery',
    AddGrocerySuccess: 'AddGrocerySuccess',
    LoadGroceries: 'LoadGroceries',
    LoadGroceriesSuccess: 'LoadGroceriesSuccess',
    RemoveGrocery: 'RemoveGrocery'
}

export class AddGroceryAction implements Action {
    type = GroceryActions.AddGrocery
    constructor(public payload?: { id: string, name: string }) { }
}

export class AddGrocerySuccessAction implements Action {
    type = GroceryActions.AddGrocerySuccess
    constructor(public payload?: { id: string, name: string }) { }
}

export class LoadGroceriesAction implements Action {
    type = GroceryActions.LoadGroceries
    constructor(public payload?: { id: string }) { }
}

export class LoadGroceriesSuccessAction implements Action {
    type = GroceryActions.LoadGroceriesSuccess
    constructor(public payload?: { id: string, name: string }[]) { }
}

export class RemoveGroceryAction {
    type = GroceryActions.RemoveGrocery
    constructor(public payload?: { id: string }) { }
}

export class RemoveGrocerySuccessAction {
    type = GroceryActions.RemoveGrocery
    constructor(public payload?: { id: string }) { }
}