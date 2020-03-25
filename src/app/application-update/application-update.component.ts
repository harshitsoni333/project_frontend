import { Component, OnInit } from '@angular/core';
import { Application } from '../model/application';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-application-update',
  templateUrl: './application-update.component.html',
  styleUrls: ['./application-update.component.css']
})
export class ApplicationUpdateComponent implements OnInit {

  id:number;
  applicationCode:string;
  application:Application;

  validEmail:boolean=false;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;


  constructor(private route:ActivatedRoute,private router:Router,private applicationService:ApplicationService) { }

  ngOnInit() {
    this.application=new Application();

    this.applicationCode=this.route.snapshot.params['applicationCode'];

    this.applicationService.getApplication(this.applicationCode)
    .subscribe(data => {
      console.log(data)
      this.application=data;
    },//error => console.log(error));
    error => alert(error));
  }

  updateApplication(){
    this.applicationService.updateApplication(this.applicationCode,this.application)
    /*
    .subscribe(data => console.log(data), 
    //error => console.log(error));
    //error => alert("Invalid Input Data"));
    this.application=new Application();
    this.goToList();
    */
   .subscribe(data => {
     console.log(data);
     this.application=new Application();
     this.goToList();
   },
   error => {
    console.log(error);
    this.errorMessage=error;
    alert(this.errorMessage.error.message);
  }
  )


    
  }

  onSubmit(){
    this.updateApplication();
  }
  
  cancel(){
    this.router.navigate(['/application']);
  }


  goToList(){
    this.router.navigate(['/application']).then(() => {
      window.location.reload();
    })
  }

  checkCode():boolean{
    if(this.application.applicationCode.charAt(0)=='@'){
      return false;
    }
    this.application.contacts="";
    return true;
  }

  checkEmail(newValue){
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
        this.validEmail = true;
    }else {
      this.validEmail = false;
    }
  }

}
