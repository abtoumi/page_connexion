import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { urlUtils} from '../../environments/environment';
import {isNullOrUndefined} from 'util';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private url: string = urlUtils + '/authentication/login';
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        `${this.url}`
        return this.http.post<any>(`${this.url}`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if(isNullOrUndefined(user)){
                        return false;
                }else{
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);                    
                }
                return true;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}