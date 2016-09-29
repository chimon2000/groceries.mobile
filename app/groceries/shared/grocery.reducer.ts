import { ActionReducer, Action } from '@ngrx/store';
import { Grocery } from './grocery';
import { AddGroceryAction, RemoveGroceryAction, LoadGroceriesAction } from './grocery.actions';

let removeGrocery = (groceries: Grocery[], id: string) => {
    let index = findIndex(groceries, id)

    return index === -1 ? [...groceries] : remove(groceries, index)
}

let remove = (arr: any[], index) => {

    return [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ];
}

let findIndex = (groceries: Grocery[], id: string) => {
    let index = -1
    for (var i = 0; i < groceries.length; i++) {
        if (groceries[i].id == id) {
            index = i
        }
    }

    return index
}

export const groceriesReducer: ActionReducer<Grocery[]> = (state: Grocery[], action: Action) => {

    if (action instanceof AddGroceryAction) {
        const grocery = new Grocery(action.payload.id, action.payload.name)

        return [...state, grocery]
    }
    else if (action instanceof LoadGroceriesAction) {
        const groceries = action.payload.map(row => new Grocery(row.id, row.name))

        return [...groceries]
    }
    else if (action instanceof RemoveGroceryAction) {

        return removeGrocery(state, action.payload.id)
    }

    return [...state]
}