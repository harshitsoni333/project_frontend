import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Application } from '../model/application';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { ContactService } from '../service/contact.service';
import { Contact } from '../model/contact';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-application-management',
  templateUrl: './application-management.component.html',
  styleUrls: ['./application-management.component.css']
})
export class ApplicationManagementComponent implements OnInit {

  application: Observable<Application[]>;
  isAdmin:string; //TO CHECK LOGIN IS BY ADMIN OR NOT

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: Number = 1;
  count: Number = 5;


  //TO CHECK APPLICATION CODE PRESENT IN THE CONTACT MANAGEMENT OR NOT
  checkApplicationContactValue=false;


  constructor(private applicationService:ApplicationService,private router:Router,private hardcodedAuthenticationService:HardcodedAuthenticationService,private contactService:ContactService) {
    this.isAdmin=sessionStorage.getItem('isAdmin'); //GET ADMIN VALUE FUNCTION MADE IN THE SERVICE TO GET THE CURRENT ISADMIN VALUE BUT RETURNING A STRING VALUE
    console.log(this.isAdmin);
   }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.application=this.applicationService.getApplicationList();
  }

  deleteApplication(applicationCode: string) {
    this.applicationService.deleteApplication(applicationCode)
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

  updateApplication(applicationCode: string){
    this.router.navigate(['update-application', applicationCode]);
  }

  detailApplication(applicationCode: string){
    this.router.navigate(['detail-application', applicationCode]);
  }

  clickMethod(applicationCode: string){
    this.contactService.getContactByApplicationCode(applicationCode)
    .subscribe(data => {
      this.checkApplicationContactValue=data;

      if(this.checkApplicationContactValue){
        alert("Entry Cannot Be Deleted");
      }
      else{
        if(confirm('Are you sure to delete Application: '+applicationCode)){
          //console.log("Implement delete functionality here");
          this.deleteApplication(applicationCode);
        }
      }
    },
    )
  }




}
