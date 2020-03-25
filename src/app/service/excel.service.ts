import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private baseUrl:string='http://localhost:8080/exportExcel';

  constructor(private http:HttpClient) { }

  getExport() {
    return this.http.get(`${this.baseUrl}`,{responseType:"blob"} );
  }
}

