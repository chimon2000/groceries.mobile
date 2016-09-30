import { groceries, Grocery, Action } from './groceries'
import { Observable, BehaviorSubject, Subject } from 'rxjs';
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