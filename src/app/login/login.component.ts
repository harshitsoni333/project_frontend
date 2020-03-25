import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { LoginService } from '../service/login.service';
import { loginUser } from '../model/loginUser';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private hardcodedAuthentication: HardcodedAuthenticationService, private route: ActivatedRoute, private userService: UserService, private loginService: LoginService, private basicAuthenticationService: BasicAuthenticationService) {
    this.loginuser.username="";
   }
  isAdmin: string;// TO CHECK USER IS ADMIN OR NOT
  password: string;
  inValidLogin = false;
  user: User = new User();
  username: string;
  loginuser: loginUser = new loginUser();
  submitted = false;


  ngOnInit() {
  }

  newUser(): void {
    this.submitted = false;
    this.loginuser = new loginUser();
  }

  save() {
    this.loginService.createUser(this.loginuser)
    .subscribe(data => {
      this.loginuser = new loginUser();
      console.log(data);
    },
    error => console.log(error));
    //error => alert(error));
  }


  onSubmit() {
    /*
  
      //FOR MASTER(ROOT) USER
      if (this.loginuser.username === 'ekansh' && this.loginuser.password==='1234') {
        this.isAdmin = 'Admin';
        if (this.hardcodedAuthentication.authenticate(this.loginuser.username, this.loginuser.password, this.isAdmin)) {
  
          this.submitted = true;
          this.save();
          this.router.navigate(['/']);
          this.inValidLogin = false;
        }
        else {
          alert("Invalid User");
        }
        console.log(this.isAdmin);
      }
  
      //FOR OTHER USERS
      else if(this.loginuser.password==='1234'){
  
        this.userService.getUser(this.loginuser.username)
          .subscribe(data => {
            console.log(data);
            this.user = data;
            this.isAdmin = this.user.profile;
  
            console.log(this.loginuser.username);
            console.log(this.isAdmin);
  
            if (this.hardcodedAuthentication.authenticate(this.loginuser.username, this.loginuser.password, this.isAdmin)) {
              this.submitted = true;
              this.save();
              this.router.navigate(['/']);
              this.inValidLogin = false;
            }
            else {
              alert('Invalid User');
              this.inValidLogin = true;
            }
  
          }, //error => console.log(error)
            error => alert("User does not exists.")
          )
      }
      */


    //FOR MASTER(ROOT) USER
    if (this.loginuser.username === 'ekansh' && this.loginuser.password === '1234') {
      this.isAdmin = 'Admin';
      this.basicAuthenticationService.executeJWTAuthenticationService(this.loginuser.username, this.loginuser.password)
        .subscribe(data => {
          console.log(data);
          this.basicAuthenticationService.setSessionStorageForAdmin(this.isAdmin);
          this.submitted = true;
          this.save();
          this.router.navigate(['/']);
          this.inValidLogin = false;
        })
      error => {
        console.log(error);
        alert("Invalid User");
      }
      console.log(this.isAdmin);
    }

    //FOR OTHER USERS
    else if (this.loginuser.password === '1234') {

        this.basicAuthenticationService.executeJWTAuthenticationService(this.loginuser.username, this.loginuser.password)
        .subscribe(data => {
          console.log(data);
          this.submitted = true;
          this.save();
          this.router.navigate(['/']);
          this.inValidLogin = false;

          this.userService.getUser(this.loginuser.username)
          .subscribe(data => {
            console.log(data);
            this.user = data;
            this.isAdmin = this.user.profile;
            sessionStorage.setItem('firstName',this.user.firstName);
            this.basicAuthenticationService.setSessionStorageForAdmin(this.user.profile);
            console.log(this.loginuser.username);
    
          }, error => console.log(error)
          //error => alert("User does not exists.")
        )


        },
          error => {
            console.log(error);
            alert('Invalid User');
            this.inValidLogin = true;
          })

    }

  }

}