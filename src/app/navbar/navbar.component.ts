import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  //isUserLogginIn:boolean = false;
  username;
  

  constructor(private hardcodedAuthentication : HardcodedAuthenticationService,private router:Router,private basicAuthentication: BasicAuthenticationService) {
    if(sessionStorage.getItem('firstName')!=null){
    this.username=sessionStorage.getItem('firstName');
    }
    if(sessionStorage.getItem('firstName')==null){
      this.username=sessionStorage.getItem('authenticaterUser');
    }
  }

  ngOnInit() {
    //this.isUserLogginIn=this.hardcodedAuthentication.isUserLoggedIn();
    //this.isUserLogginIn=this.basicAuthentication.isUserLoggedIn();
  }




}
