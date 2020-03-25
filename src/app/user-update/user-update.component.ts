import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  id:number;
  user:User;
  username:string;

  validUserName:boolean=false;

  errorMessage:ErrorMessage;

  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService) { }

  ngOnInit() {
    this.user=new User();

    this.username=this.route.snapshot.params['username'];

    this.userService.getUser(this.username)
    .subscribe(data => {
      console.log(data)
      this.user=data;
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

  updateUser(){
    this.userService.updateUser(this.username,this.user)
    /*
    .subscribe(data => console.log(data), 
    error => console.log(error));
    //error => alert(error));
    this.user=new User();
    this.goToList();
    */

    .subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error);
      this.errorMessage=error;
      alert(this.errorMessage.error.message);
    }
    )
  }

  onSubmit(){
    this.updateUser();
    this.goToList();
  }

  cancel(){
    this.router.navigate(['/user']);
  }


  goToList(){
    this.router.navigate(['/user']).then(() => {
      window.location.reload();
    })
  }

  checkUserName(newValue){
    const validUserNameRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validUserNameRegEx.test(newValue)) {
        this.validUserName = true;
    }else {
      this.validUserName = false;
    }
  }


}
