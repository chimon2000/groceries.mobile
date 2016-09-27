import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";

import { User } from './user';
import { Config } from '../config';

let buildUrl = (base, ...paths) => [base, ...paths].join('/')
let handleErrors = (error: any) => {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
}

@Injectable()
export class UserService {
    constructor(private http: Http) {

    }

    register(user: User) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')

        let url = buildUrl(Config.apiUrl, 'Users')
        let payload = JSON.stringify({
            Username: user.email,
            Password: user.password,
            Email: user.email
        })

        return this.http
            .post(url, payload, { headers })
            .catch(handleErrors)
    }

    login(user: User) {

        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let url = buildUrl(Config.apiUrl, 'oauth', 'token')
        let payload = JSON.stringify({
            username: user.email,
            password: user.password,
            grant_type: "password"
        })

        return this.http
            .post(url, payload, { headers })
            .map(response => response.json())
            .do(data => Config.token = data.Result.access_token)
            .catch(handleErrors)
    }
}