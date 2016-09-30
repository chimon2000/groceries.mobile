import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable, Observer } from "rxjs";
import { handleErrors, buildUrl } from '../../shared';
import {
    Grocery
} from './grocery'

import {
    Action,
    AddGroceryAction,
    LoadGroceriesAction,
    RemoveGroceryAction
} from './grocery.actions'

import { Config } from '../../shared'
import { dispatcher } from '../../app.state'

@Injectable()
export class GroceryService {

    constructor(private http: Http,
        @Inject(dispatcher) private dispatcher: Observer<Action>) { }

    load(): Observable<Grocery[]> {
        let headers = new Headers()
        headers.append('Authorization', `Bearer ${Config.token}`)
        let url = buildUrl(Config.apiUrl, 'Groceries')

        return this.http
            .get(url, { headers })
            .map(res => res.json())
            .map(({Result = []}) => {
                let groceries = Result
                    .map(grocery => new Grocery(grocery.Id, grocery.Name))
                return groceries
            })
            .do(groceries => {
                this.dispatcher.next(new LoadGroceriesAction(groceries))
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
            .do(grocery => this.dispatcher.next(new AddGroceryAction(grocery)))
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
            .do(() => this.dispatcher.next(new RemoveGroceryAction(id)))
            .catch(handleErrors)
    }
}