import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../model/authentication';
import { map } from 'rxjs/operators';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {


  

  private baseUrl:string='http://localhost:8080/api/v1/basicAuth';

  constructor(private http:HttpClient) { }

  /*
 authenticate(email,password,isAdmin){
  //console.log('Before login'+this.isUserLoggedIn());
  if(email==='ekansh' || password==='1234' ){
    sessionStorage.setItem('authenticatedUser',email);
    sessionStorage.setItem('isAdmin',isAdmin);
    //console.log(this.isUserLoggedIn());
    //console.log('After login'+this.isUserLoggedIn());
    return true;
  }
  return false;
}
*/
getAuthenticatedUser(){
  return sessionStorage.getItem(AUTHENTICATED_USER);
}

getAuthenticatedToken() {
  if(this.getAuthenticatedUser())
    return sessionStorage.getItem(TOKEN);
}

isUserLoggedIn() {
  let user = sessionStorage.getItem(AUTHENTICATED_USER);
  return !(user === null);
}

/*
//FUNCTION USED TO STORE THE ISADMIN PROPERTY EVEN AFTER THE PAGE IS REFRESHED, BUT BOOLEAN IS CONVERTED INTO STRING 
getAdminValue(){
  this.isAdmin=sessionStorage.getItem('isAdmin');
  return this.isAdmin;
}
*/

logout(){
  sessionStorage.removeItem(AUTHENTICATED_USER);
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem(TOKEN)
  sessionStorage.removeItem('isAdmin');
}

/*
executeAuthenticationService(username,password,isAdmin){
  let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

  let headers=new HttpHeaders({
    Authorization: basicAuthHeaderString
  })

  return this.http.get<Authentication>(`http://localhost:8080/api/v1/basicAuth`,{headers}).pipe(
    map(
      data => {
        sessionStorage.setItem('authenticatedUser',username);
        sessionStorage.setItem('isAdmin',isAdmin);
        return data;
      }
    )
  );
}
*/


executeJWTAuthenticationService(username,password){

  return this.http.post<any>(`http://localhost:8080/authenticate`,{username,password}).pipe(
    map(
      data => {
        sessionStorage.setItem(AUTHENTICATED_USER,username);
        sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
        return data;
      }
    )
  );
}


setSessionStorageForAdmin(isAdmin:string){
  sessionStorage.setItem('isAdmin',isAdmin);
}


  
}
