import { Grocery } from './grocery'
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Action, AddGroceryAction, RemoveGroceryAction } from './actions';
import { OpaqueToken } from '@angular/core';

export interface AppState {
    groceries: Grocery[]
}

function wrapIntoBehavior(init: AppState, obs: Observable<any>) {
    const res = new BehaviorSubject(init)
    obs.subscribe(s => res.next(s))

    return res
}

export function stateFn(initState: AppState, actions: Observable<Action>) {
    const combine = s => ({ groceries: s[0] })
    const appState = groceries(initState.groceries, actions)
        .zip()
        .map(combine)

    return wrapIntoBehavior(initState, appState)
}

export const initState = new OpaqueToken('initState')
export const dispatcher = new OpaqueToken('dispatcher')
export const state = new OpaqueToken('state')

export const StateAndDispatcher = [
    {
        provide: initState,
        useValue: {
            groceries: []
        },
    },
    {
        provide: dispatcher,
        useValue: new Subject<Action>()
    },
    {
        provide: state,
        useFactory: stateFn,
        deps: [
            initState,
            dispatcher
        ]
    }

]

function groceries(initialState: Grocery[], actions: Observable<Action>) {
    return actions.scan((state: Grocery[], action) => {

        if (action instanceof AddGroceryAction) {
            const grocery = new Grocery(action.id, action.name)

            return [...state, grocery]
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