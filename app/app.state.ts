import { groceriesReducer, Grocery } from './groceries';
import { compose } from "@ngrx/core/compose";
import { combineReducers } from '@ngrx/store';

export interface AppState {
    groceries: Grocery[]
}

export default compose(combineReducers)({ groceries: groceriesReducer });