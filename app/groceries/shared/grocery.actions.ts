import { Action } from '@ngrx/store';

export class AddGroceryAction implements Action {
    type = 'AddGroceryAction'
    constructor(public payload?: { id: string, name: string }) { }
}

export class LoadGroceriesAction implements Action {
    type = 'LoadGroceriesAction'
}

export class LoadGroceriesSuccessAction implements Action {
    type = 'LoadGroceriesSuccessAction'
    constructor(public payload?: { id: string, name: string }[]) { }
}

export class RemoveGroceryAction {
    type = 'RemoveGroceryAction'
    constructor(public payload?: { id: string }) { }
}