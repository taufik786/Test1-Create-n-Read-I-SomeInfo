import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthData } from './auth.modal';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASEURL = 'http://localhost:5000/api';

  authData = new Subject<AuthData>();
  private currentUserSubject: BehaviorSubject<AuthData>;
  public currentUser: Observable<AuthData>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthData>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthData {
    return this.currentUserSubject.value;
  }

  Register(data: AuthData){
    return this.http.post<any>(`${this.BASEURL}/register`, data).pipe(map(user => {
      if(user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }))
  }

  Login(body): Observable<any> {
    return this.http.post<any>(`${this.BASEURL}/login`, body).pipe(map(user => {
      if(user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }))
  }
  loggedIn() {
    const currentUser = this.currentUserValue;
    if(currentUser && currentUser.token) {
      return true
    } else {
      return false
    }
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
