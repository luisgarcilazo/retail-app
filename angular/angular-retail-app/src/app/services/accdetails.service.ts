import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../entities/User';
import { Role } from '../entities/Role';

@Injectable({
  providedIn: 'root'
})
export class AccDetailsService {
  private usersApi = 'http://localhost:8081/api/users'
  private clientApi = 'http://localhost:8081/api/users/client'
  private devApi = 'http://localhost:8081/api/users/dev';
  private managerApi = 'http://localhost:8081/api/users/manager';
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http:HttpClient) { }

  addClient(user: User): Observable<User>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<User>(this.clientApi, user, this.httpOptions);
  }
  addDev(user: User): Observable<User>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.post<User>(this.devApi,user, this.httpOptions);
  }
  addManager(user: User): Observable<User>{
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post<User>(this.managerApi,user, this.httpOptions);
  }
  loginCheck(user: User): Observable<User> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const url = `${this.usersApi}/login`;
    return this.http.post<User>(url,user, this.httpOptions);
  }
}
