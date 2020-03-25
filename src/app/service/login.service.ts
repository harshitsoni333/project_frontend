import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl:string='http://localhost:8080/api/v1/login';
  constructor(private http:HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  createUser(loginuser: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loginuser);
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
