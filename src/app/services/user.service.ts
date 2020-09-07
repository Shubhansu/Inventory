import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { User, Product } from '../models';
import { envConfig } from '../environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    getAllProduct() {
        const headers = { 'accessToken': localStorage.getItem('currentUserSession')};
        let response = this.http.get(`${envConfig.apiUrl}/inv/getProducts?limit=10`, {headers});
        return response;
    }

    getById(id: number) {
        return this.http.get(`${envConfig.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${envConfig.apiUrl}/inv/signUp`, user);
    }

    update(user: User) {
        return this.http.put(`${envConfig.apiUrl}/users/` + user.id, user);
    }

    delete(id: any) {
        return this.http.delete(`${envConfig.apiUrl}/users/` + id);
    }
}