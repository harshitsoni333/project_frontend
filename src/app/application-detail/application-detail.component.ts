import { Component, OnInit } from '@angular/core';
import { Application } from '../model/application';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})
export class ApplicationDetailComponent implements OnInit {

  id:number;
  applicationCode:string;
  application:Application;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;


  constructor(private route: ActivatedRoute,private router: Router,
    private applicationService: ApplicationService) { }

    ngOnInit() {
      this.application = new Application();
  
      this.applicationCode = this.route.snapshot.params['applicationCode'];
      
      this.applicationService.getApplication(this.applicationCode)
        .subscribe(data => {
          console.log(data)
          this.application = data;
        }, //error => console.log(error));
        //error => alert("Cannot Fetch the Application"));
        error => {
          console.log(error);
          this.errorMessage=error;
          alert(this.errorMessage.error.message);
        }
        )
    }
  
    list(){
      this.router.navigate(['application']);
    }

}
