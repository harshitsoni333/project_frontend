import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../service/file.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { File } from '../model/file';
import { ContactService } from '../service/contact.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css']
})
export class FileManagementComponent implements OnInit {
  file: Observable<File[]>;
  isAdmin:string; //TO CHECK LOGIN IS BY ADMIN OR NOT

  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: Number = 1;
  count: Number = 5;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;



  //TO CHECK FILE CODE PRESENT IN THE CONTACT MANAGEMENT OR NOT
  checkFileCodeValue=false;

  constructor(private fileService:FileService,private router:Router,private hardcodedAuthenticationService:HardcodedAuthenticationService,private contactService:ContactService) { 
    this.isAdmin=sessionStorage.getItem('isAdmin'); //GET ADMIN VALUE FUNCTION MADE IN THE SERVICE TO GET THE CURRENT ISADMIN VALUE BUT RETURNING A STRING VALUE
    console.log(this.isAdmin);
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.file=this.fileService.getFileList();
  }

  deleteFile(fileCode: string) {
    this.fileService.deleteFile(fileCode)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        //error => console.log(error));
        error => alert(error));
  }

  updateFile(fileCode: string){
    this.router.navigate(['update-file', fileCode]);
  }

  detailFile(fileCode: string){
    this.router.navigate(['detail-file', fileCode]);
  }
  clickMethod(fileCode: string){
    this.contactService.getContactByFileCode(fileCode)
    .subscribe(data => {
      this.checkFileCodeValue=data;

      if(this.checkFileCodeValue){
        alert("Entry Cannot Be Deleted");
      }
      else{
        if(confirm('Are you sure to delete File: '+fileCode)){
          //console.log("Implement delete functionality here");
          this.deleteFile(fileCode);
        }
      }
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

}
