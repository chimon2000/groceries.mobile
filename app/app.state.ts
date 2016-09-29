import { groceriesReducer, Grocery } from './groceries';

export interface AppState {
    groceries: Grocery[]
}

export interface UiState {
    action: string
    message: string
}