import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string='http://localhost:8080/api/v1/user';

  constructor(private http:HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(username:string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${username}`, value);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${username}`, { responseType: 'text' });
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }


}






  /*
//GET USER
get(url: string): Observable<any> {
  return this.http.get(this.serverUrl + url);
}

//NEW USER
post(url: string, data: User): Observable<any> {
  return this.http.post(this.serverUrl + url, data);
}

//UPDATE USER
put(url: string, data: User): Observable<any> {
  return this.http.put(this.serverUrl + url, data);
}

//DELETE USER
delete(url: string, data: User): Observable<any> {
  return this.http.delete(this.serverUrl + url, { params: { id: data.id + "" } });
}

/*
  getUserList():Observable<any>{
    return this.http.get(this.baseUrl);
  }
  */
