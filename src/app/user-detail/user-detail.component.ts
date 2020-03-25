import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id:number;
  user:User;
  username:string;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  constructor(private route: ActivatedRoute,private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.user = new User();

    this.username = this.route.snapshot.params['username'];
    
    this.userService.getUser(this.username)
      .subscribe(data => {
        console.log(data)
        this.user = data;
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

  list(){
    this.router.navigate(['user']);
  }

}
