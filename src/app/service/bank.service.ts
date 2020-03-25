import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseUrl:string='http://localhost:8080/banks';

  constructor(private http:HttpClient) { }

  getBank(bankCode:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${bankCode}`);
  }

  createBank(bank: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, bank);
  }

  updateBank(bankCode:string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${bankCode}`, value);
  }

  deleteBank(bankCode: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bankCode}`, { responseType: 'text' });
  }

  getBankList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
