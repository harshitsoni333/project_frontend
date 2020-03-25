import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileTypeService } from '../service/file-type.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Observable } from "rxjs";
import { FileType } from '../model/fileType';
import { ContactService } from '../service/contact.service';
import { ErrorMessage } from '../model/error';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-file-type-management',
  templateUrl: './file-type-management.component.html',
  styleUrls: ['./file-type-management.component.css']
})
export class FileTypeManagementComponent implements OnInit {
  fileType: Observable<FileType[]>;
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

    //TO CHECK FILETYPE CODE PRESENT IN THE CONTACT MANAGEMENT OR NOT
    checkFileTypeCodeValue=false;

  constructor(private fileTypeService:FileTypeService,private router:Router,private hardcodedAuthenticationService:HardcodedAuthenticationService,private contactService:ContactService,private basicAuthenticationService:BasicAuthenticationService) {
    this.isAdmin=sessionStorage.getItem('isAdmin'); //GET ADMIN VALUE FUNCTION MADE IN THE SERVICE TO GET THE CURRENT ISADMIN VALUE BUT RETURNING A STRING VALUE
    console.log(this.isAdmin);
   }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.fileType=this.fileTypeService.getFileTypeList();
  }

  deleteFileType(fileTypeCode: string) {
    this.fileTypeService.deleteFileType(fileTypeCode)
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

  updateFileType(fileTypeCode: string){
    this.router.navigate(['update-fileType', fileTypeCode]);
  }

  detailFileType(fileTypeCode: string){
    this.router.navigate(['detail-fileType', fileTypeCode]);
  }
  clickMethod(fileTypeCode: string){
    this.contactService.getContactByFileType(fileTypeCode)
    .subscribe(data => {
      this.checkFileTypeCodeValue=data;

      if(this.checkFileTypeCodeValue){
        alert("Entry Cannot Be Deleted");
      }
      else{
        if(confirm('Are you sure to delete File: '+fileTypeCode)){
          //console.log("Implement delete functionality here");
          this.deleteFileType(fileTypeCode);
        }
      }
    },
    //error => console.log(error));
    error => {
      //console.log(error);
      //this.errorMessage=error;
      //alert(this.errorMessage.error.message);
      alert("Entry Cannot Be Deleted");
    }
    )
  }
  


}
