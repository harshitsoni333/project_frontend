import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl:string='http://localhost:8080/applications';

  constructor(private http:HttpClient) { }

  getApplication(applicationCode:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${applicationCode}`);
  }

  createApplication(application: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, application);
  }

  updateApplication(applicationCode:string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${applicationCode}`, value);
  }

  deleteApplication(applicationCode: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${applicationCode}`, { responseType: 'text' });
  }

  getApplicationList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
