import { Grocery } from './grocery';

export class AddGroceryAction {
    constructor(public grocery: Grocery) { }
}

export class LoadGroceriesAction {
    constructor(public groceries: Grocery[]) { }
}

export class RemoveGroceryAction {
    constructor(public id: string) { }
}

export type Action = AddGroceryAction | RemoveGroceryAction | LoadGroceriesAction