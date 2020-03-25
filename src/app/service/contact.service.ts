import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl:string='http://localhost:8080/api/v1/contacts';


  private baseUrlApplication:string='http://localhost:8080/api/v1/contactsApplicationCode';
  private baseUrlFile:string='http://localhost:8080/api/v1/contactsFileCode';
  private baseUrlFileType:string='http://localhost:8080/api/v1/contactsFileTypeCode';

  constructor(private http:HttpClient) { }

  getContact(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //TO GET CONTACT BY APPLICATION CODE
  getContactByApplicationCode(applicationCode: string): Observable<any> {
    return this.http.get(`${this.baseUrlApplication}/${applicationCode}`);
  }

  //TO GET CONTACT BY FILE CODE
  getContactByFileCode(fileCode: string): Observable<any> {
    return this.http.get(`${this.baseUrlFile}/${fileCode}`);
  }

  //TO GET CONTACT BY FILETYPE CODE
  getContactByFileType(fileTypeCode: string): Observable<any> {
    return this.http.get(`${this.baseUrlFileType}/${fileTypeCode}`);
  }


  createContact(contact: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, contact);
  }

  updateContact(id:number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getContactList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
