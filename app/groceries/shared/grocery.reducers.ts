import { Grocery } from './grocery'
import { Action, AddGroceryAction, LoadGroceriesAction, RemoveGroceryAction } from './grocery.actions';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export function groceries(initialState: Grocery[], actions: Observable<Action>) {
    return actions.scan((state: Grocery[], action: Action) => {

        if (action instanceof AddGroceryAction) {
            return [...state, action.grocery]
        }
        else if (action instanceof LoadGroceriesAction) {
            return [...action.groceries]
        }
        else if (action instanceof RemoveGroceryAction) {

            return removeGrocery(state, action.id)
        }

        return [...state]
    }, initialState)
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