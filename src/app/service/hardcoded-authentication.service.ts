import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  isAdmin;//TO GET ADMIN PROPERTY

  constructor(private httpClient:HttpClient) { }



  /*
  authenticate(username,password,isAdmin){
    //console.log('Before login'+this.isUserLoggedIn());
    if(username==='ekansh'  && password==='1234'){
      sessionStorage.setItem('authenticatedUser',username);
      sessionStorage.setItem('isAdmin',isAdmin);
      //console.log(this.isUserLoggedIn());
      //console.log('After login'+this.isUserLoggedIn());
      return true;
    }
    return false;
  }
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user===null);
  }
  //FUNCTION USED TO STORE THE ISADMIN PROPERTY EVEN AFTER THE PAGE IS REFRESHED, BUT BOOLEAN IS CONVERTED INTO STRING 
  getAdminValue(){
    this.isAdmin=sessionStorage.getItem('isAdmin');
    return this.isAdmin;
  }

  logout(){
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('isAdmin');
  }
  */

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
isUserLoggedIn(){
  let user = sessionStorage.getItem('authenticatedUser');
  return !(user===null);
}
//FUNCTION USED TO STORE THE ISADMIN PROPERTY EVEN AFTER THE PAGE IS REFRESHED, BUT BOOLEAN IS CONVERTED INTO STRING 
getAdminValue(){
  this.isAdmin=sessionStorage.getItem('isAdmin');
  return this.isAdmin;
}

logout(){
  sessionStorage.removeItem('authenticatedUser');
  sessionStorage.removeItem('isAdmin');
}


  
}
