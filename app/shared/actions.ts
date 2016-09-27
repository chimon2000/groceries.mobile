export class AddGroceryAction {
    constructor(public id: string, public name: string) { }
}

export class RemoveGroceryAction {
    constructor(public id: string) { }
}

export type Action = AddGroceryAction | RemoveGroceryAction