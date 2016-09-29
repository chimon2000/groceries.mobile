import { ActionReducer, Action } from '@ngrx/store';
import { Grocery } from './grocery';
import { AddGrocerySuccessAction, LoadGroceriesSuccessAction, RemoveGrocerySuccessAction } from './grocery.actions';

export const groceriesReducer: ActionReducer<Grocery[]> = (state: Grocery[], action: Action) => {
    console.log('groceriesReducer')

    if (action instanceof AddGrocerySuccessAction) {
        const grocery = new Grocery(action.payload.id, action.payload.name)

        return [...state, grocery]
    }
    else if (action instanceof LoadGroceriesSuccessAction) {
        const groceries = action.payload.map(row => new Grocery(row.id, row.name))

        return [...groceries]
    }
    else if (action instanceof RemoveGrocerySuccessAction) {

        return removeGrocery(state, action.payload.id)
    }

    return state
}

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