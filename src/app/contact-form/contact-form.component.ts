import { File } from './../model/file';
import { Observable } from 'rxjs';
import { FileTypeService } from './../service/file-type.service';
import { FileService } from './../service/file.service';
import { ApplicationService } from './../service/application.service';
import { Contact } from './../model/contact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';
import { Application } from '../model/application';
import { FileType } from '../model/fileType';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {


  contact:Contact =new Contact();
  submitted=false;


  //TO GET THE APPLICATION CODE , FILE CODE & FILETYPECODE FOR DROPDOWN
  application:Observable<Application[]>;
  file:Observable<File[]>;
  fileType:Observable<FileType[]>;

  //TO GET THE CONTACTS FROM THE APPLICATION AND FILE TABLE ON THE BASIS OF THERE CODE SELECTED
  applicationData:Application=new Application();
  fileData:File=new File();



  constructor(private contactService:ContactService,private router:Router,private applicationService:ApplicationService,private fileService:FileService,private fileTypeService:FileTypeService) {
    //SETTING THE INITIAL VALUE OF THE CONTACTS FIELD FOR CONTACT MANAGEMENT
    this.contact.contacts="";
    this.contact.applicationCode="";
    this.contact.fileCode="";
    this.contact.fileTypeCode="";

  }

  ngOnInit() {
    //TO GET THE APPLICATION CODE , FILE CODE & FILETYPECODE FOR DROPDOWN
    this.application=this.applicationService.getApplicationList();
    this.file=this.fileService.getFileList();
    this.fileType=this.fileTypeService.getFileTypeList();
  }

  newUser(): void {
    this.submitted = false;
    this.contact = new Contact();
  }

  save() {
    this.contactService.createContact(this.contact)
    .subscribe(data => console.log(data), error => console.log(error));
    this.contact = new Contact();
    this.gotoList();
  }

  cancel(){
    this.router.navigate(['/contact']);
  }

  onSubmit() {
      this.save();   
  }

  gotoList() {
    this.router.navigate(['/contact']).then(() => {
      window.location.reload();
    })
  }

  getApplicationContacts(){

    //TO GET THE APPsLICATION DATA
    this.applicationService.getApplication(this.contact.applicationCode)
    .subscribe(data => {
      this.applicationData=data;
      //WHEN APPLICATION CONTACT IS NOT NULL
      if(this.applicationData.contacts.length!=0){
        this.contact.contacts+=this.applicationData.contacts+";";
      }
      //WHEN APPLICATION CONTACT IS NOT NULL
      else{
        this.contact.contacts+=""+";";
      }
      
    }, error => console.log(error));
    //error => alert(error));

  }

  getFileContacts(){

    //TO GET THE FILE DATA
    this.fileService.getFile(this.contact.fileCode)
    .subscribe(data => {
      this.fileData=data;
      //WHEN FILE CONTACT IS NOT NULL
      if(this.fileData.contacts.length!=0){
        this.contact.contacts+=this.fileData.contacts+";";
      }
      //WHEN FILE CONTACT IS NULL
      else{
        this.contact.contacts+=""+";";
      }
    }, error => console.log(error));
    //error => alert(error));
  }

  clear(){
    this.contact.contacts="";
    this.contact.applicationCode="";
    this.contact.fileCode="";
    this.contact.fileTypeCode="";
  }


}
