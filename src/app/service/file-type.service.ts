import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {

  private baseUrl:string='http://localhost:8080/api/v1/fileTypes';

  constructor(private http:HttpClient) { }

  getFileType(fileTypeCode:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${fileTypeCode}`);
  }

  createFileType(fileType: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, fileType);
  }

  updateFileType(fileTypeCode:string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${fileTypeCode}`, value);
  }

  deleteFileType(fileTypeCode: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${fileTypeCode}`, { responseType: 'text' });
  }

  getFileTypeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
