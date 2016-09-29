import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable, Observer } from "rxjs";
import { handleErrors, buildUrl, Config } from '../../shared';
import {
    Grocery
} from './grocery'

import {
    AddGroceryAction,
    UpdateGroceryAction,
    RemoveGroceryAction,
    LoadGroceriesAction
} from './grocery.actions'

import {
    AppState
} from '../../app.state'

import { Store } from '@ngrx/store';

@Injectable()
export class GroceryService {

    constructor(private http: Http, public store: Store<AppState>) { }

    load(): Observable<Grocery[]> {
        let headers = new Headers()
        headers.append('Authorization', `Bearer ${Config.token}`)
        let url = buildUrl(Config.apiUrl, 'Groceries')

        return this.http
            .get(url, { headers })
            .map(res => res.json())
            .map(({Result = []}) => {
                let groceries = Result
                    .map(grocery => new Grocery(grocery.Id, grocery.Name, grocery.Status))

                return groceries
            })
            .do(groceries => {
                this.store.dispatch(new LoadGroceriesAction(groceries))
            })
            .catch(handleErrors)
    }

    add(name: string) {
        let headers = new Headers()
        headers.append('Authorization', `Bearer ${Config.token}`)
        headers.append('Content-Type', 'application/json')

        let payload = JSON.stringify({ Name: name })

        return this.http
            .post(
            buildUrl(Config.apiUrl, 'Groceries'),
            payload,
            { headers }
            )
            .map(res => res.json())
            .map(({Result}) => new Grocery(Result.Id, name))
            .do((grocery) => this.store.dispatch(new AddGroceryAction(grocery)))
            .catch(handleErrors)
    }

    delete(id: string) {

        let headers = new Headers()
        headers.append('Authorization', `Bearer ${Config.token}`)
        headers.append('Content-Type', 'application/json')
        let url = buildUrl(Config.apiUrl, 'Groceries', id)

        return this.http
            .delete(url, { headers })
            .map(res => res.json())
            .do(() => this.store.dispatch(new RemoveGroceryAction({ id })))
            .catch(handleErrors)
    }

    complete({id, name}) {
        let headers = new Headers()
        headers.append('Authorization', `Bearer ${Config.token}`)
        headers.append('Content-Type', 'application/json')
        let url = buildUrl(Config.apiUrl, 'Groceries', id)

        let payload = JSON.stringify({ Status: 'complete' })

        return this.http
            .put(url, payload, { headers })
            .map(res => res.json())
            .map(() => new Grocery(name, id, status))
            .do((grocery) => this.store.dispatch(new UpdateGroceryAction(grocery)))
            .catch(handleErrors)
    }

    undo({id, name}) {
        let headers = new Headers()
        headers.append('Authorization', `Bearer ${Config.token}`)
        headers.append('Content-Type', 'application/json')
        let url = buildUrl(Config.apiUrl, 'Groceries', id)

        let payload = JSON.stringify({ Status: 'pending' })

        return this.http
            .put(url, payload, { headers })
            .map(res => res.json())
            .map(() => new Grocery(name, id, status))
            .do((grocery) => this.store.dispatch(new UpdateGroceryAction(grocery)))
            .catch(handleErrors)
    }
}