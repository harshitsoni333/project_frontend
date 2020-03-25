import { User } from './../model/user';
import { Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../model/error';
import { ErrorMessageInner } from '../model/errorInner';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user:User =new User();
  user1:Observable<User[]>;
  submitted=false;


  //TO DISPLAY ERROR MESSAGE
  errorMessage:ErrorMessage;

  //userManagementComponent:UserManagementComponent;

  validUsername:boolean=false;
  userNameAlreadyExists:boolean=false;


  constructor(private userService:UserService,private router:Router) {
    //TO PREVENT SUBMISSION WITH EMPTY EMAIL ADDRESS
    this.user.username='';
   }

  ngOnInit(){
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.userService.createUser(this.user)
    .subscribe(data => {
      console.log(data);
      this.user = new User();
      this.gotoList();
    },
    error => {
      console.log(error);
      this.errorMessage=error;
      alert(this.errorMessage.error.message);
    }
    )
  }

  cancel(){
    this.router.navigate(['/user']);
  }

  onSubmit() {
    if(this.user.username.length>5){  
      this.save();
      this.submitted=true;
    }
    else if(this.user.username.length==0 || this.user.username.length<5){
      alert("Username Too Short");
    }
  }

  gotoList() {
    this.router.navigate(['/user']).then(() => {
      window.location.reload();
    })
  }

  checkUserName(newValue){
    const validUserNameRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validUserNameRegEx.test(newValue)) {
        this.validUsername = true;
    }else {
      this.validUsername = false;
    }
  }
}
