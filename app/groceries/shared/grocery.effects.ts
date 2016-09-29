import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { GroceryActions } from './grocery.actions';
import {
    Grocery
} from './grocery'

import {
    AddGrocerySuccessAction,
    RemoveGrocerySuccessAction,
    LoadGroceriesSuccessAction
} from './grocery.actions'

import { Config, buildUrl } from '../../shared';

let getHeaders = (token) => {
  let headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)

  return headers
}

@Injectable()
export class GroceryEffects {
  constructor(
    private http: Http,
    private actions$: Actions
  ) { }

  @Effect() load$ = this.actions$
    .ofType(GroceryActions.LoadGroceries)
    .switchMap(payload => this.http.get(buildUrl(Config.apiUrl, 'Groceries'), { headers: getHeaders(Config.token) })
      .map(res => res.json())
      .map(({Result = []}) => {
        return Result.map(grocery => new Grocery(grocery.Id, grocery.Name))
      })
      .map(groceries => new LoadGroceriesSuccessAction(groceries))
      .catch(() => Observable.of({ type: 'LoadGroceriesFailed' }))
    )
}
