import { Observable } from "rxjs";

export let buildUrl = (base, ...paths) => [base, ...paths].join('/')
export let handleErrors = (error: any) => {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
}