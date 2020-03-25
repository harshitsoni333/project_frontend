import { Component, OnInit } from '@angular/core';
import { Application } from '../model/application';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  application: Application = new Application();
  submitted = false;

  validEmail:boolean=false;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;


  constructor(private applicationService: ApplicationService, private router: Router) {
    this.application.applicationCode="";
  }


  ngOnInit() {
  }

  newBank(): void {
    this.submitted = false;
    this.application = new Application();
  }

  save() {
    this.applicationService.createApplication(this.application)
    /*
      .subscribe(data => console.log(data), 
      error => console.log(error));
      //error => alert("Invalid Input Data"));
    this.application = new Application();
    this.gotoList();
    */

    .subscribe(data => {
      console.log(data)
      this.application = new Application();
      this.gotoList();
    },
    error => {
      console.log(error);
      this.errorMessage=error;
      alert(this.errorMessage.error.message);
    }
    )

  }

  cancel() {
    this.router.navigate(['/application']);
  }

  onSubmit() {
    if (this.application.applicationCode.length > 0) {
      this.submitted = true;
      this.save();
    }
    else if (this.application.applicationCode.length == 0) {
      alert("Application Code Too Short");
    }
  }

  gotoList() {
    this.router.navigate(['/application']).then(() => {
      window.location.reload();
    })
  }

  checkCode():boolean{
    if(this.application.applicationCode.charAt(0)=='@'){
      return false;
    }
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