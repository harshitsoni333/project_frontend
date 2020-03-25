import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl:string='http://localhost:8080/api/v1/file';

  constructor(private http:HttpClient) { }

  getFile(fileCode:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${fileCode}`);
  }

  createFile(file: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, file);
  }

  updateFile(fileCode:string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${fileCode}`, value);
  }

  deleteFile(fileCode: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${fileCode}`, { responseType: 'text' });
  }

  getFileList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
