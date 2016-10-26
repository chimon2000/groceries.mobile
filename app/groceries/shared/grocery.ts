import { humps } from '../../utils'

export class Grocery {
    readonly id: string
    readonly name: string
    readonly status: string

    constructor(params = {}) {
        params = humps.camelizeKeys(params);
        (<any>Object).assign(this, params);
    }
}