import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { Observable } from "rxjs";
import { ErrorMessage } from '../model/error';
import { BasicAuthenticationService } from '../service/basic-authentication.service';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: Observable<User[]>;
  //selectedUser: any[];
  isAdmin:string; //TO CHECK USER LOGGED IN IS ADMIN OR NOT

  key: string = 'name'; //set default
  reverse: boolean = false;

  p: Number = 1;
  count: Number = 5;

  //TO DISPLAY ERROR MESSAGE
  errorMessage:ErrorMessage;

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private userService:UserService,private router:Router,private hardcodedAuthenticationService:HardcodedAuthenticationService,private basicAuthenticationService:BasicAuthenticationService) { 
    this.isAdmin=sessionStorage.getItem('isAdmin'); //GET ADMIN VALUE FUNCTION MADE IN THE SERVICE TO GET THE CURRENT ISADMIN VALUE BUT RETURNING A STRING VALUE
    console.log(this.isAdmin);
  }


  
  ngOnInit() {
    this.reloadData();
  }


  reloadData(){
    this.user=this.userService.getUserList();
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        //error => console.log(error));
        //error => alert(error));
        error => {
          console.log(error);
          this.errorMessage=error;
          alert(this.errorMessage.error.message);
        }
      )
  }


  updateUser(username: string){
    this.router.navigate(['update-user', username]);
  }

  detailUser(username: string){
    this.router.navigate(['detail-user', username]);
  }

  clickMethod(username:string) {
    if(confirm("Are you sure to delete User: "+username)) {
      //console.log("Implement delete functionality here");
      this.deleteUser(username);
    }
  }
  
}