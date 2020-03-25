import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { ApplicationService } from '../service/application.service';
import { FileService } from '../service/file.service';
import { FileTypeService } from '../service/file-type.service';
import { Application } from '../model/application';
import { File } from '../model/file';
import { Observable } from 'rxjs';
import { FileType } from '../model/fileType';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  id: number;
  contact: Contact = new Contact();

  //TO GET THE APPLICATION CODE , FILE CODE & FILETYPECODE FOR DROPDOWN
  application: Observable<Application[]>;
  file: Observable<File[]>;
  fileType: Observable<FileType[]>;

  //TO GET THE CONTACTS FROM THE APPLICATION AND FILE TABLE ON THE BASIS OF THERE CODE SELECTED
  applicationData: Application = new Application();
  fileData: File = new File();

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService, private applicationService: ApplicationService, private fileService: FileService, private fileTypeService: FileTypeService) {
    //SETTING THE INITIAL VALUE OF THE CONTACTS FIELD FOR CONTACT MANAGEMENT
    this.contact.contacts = "";
  }

  ngOnInit() {
    this.contact = new Contact();

    this.id = this.route.snapshot.params['id'];

    this.contactService.getContact(this.id)
      .subscribe(data => {
        console.log(data)
        this.contact = data;
      }, 
      error => console.log(error));
      //error => alert(error));

    //TO GET THE APPLICATION CODE , FILE CODE & FILETYPECODE FOR DROPDOWN
    this.application = this.applicationService.getApplicationList();
    this.file = this.fileService.getFileList();
    this.fileType = this.fileTypeService.getFileTypeList();
  }

  updateContact() {
    this.contactService.updateContact(this.id, this.contact)
    /*
      .subscribe(data => console.log(data), 
      //error => console.log(error));
      error => alert(error));
    this.contact = new Contact();
    this.goToList();
    */
   .subscribe(data => {
    console.log(data)
    this.contact = new Contact();
    this.goToList();
  },
  error => alert("Invalid Input Data"));
  }

  onSubmit() {
    this.updateContact();
  }

  cancel() {
    this.router.navigate(['/contact']);
  }


  goToList() {
    this.router.navigate(['/contact']).then(() => {
      window.location.reload();
    })
  }

  getApplicationContacts() {

    //TO GET THE APPLICATION DATA
    this.applicationService.getApplication(this.contact.applicationCode)
      .subscribe(data => {
        this.applicationData = data;
        this.contact.contacts += this.applicationData.contacts + ";";
      }, error => console.log(error));
      //error => alert(error));

  }

  getFileContacts(){

    //TO GET THE FILE DATA
    this.fileService.getFile(this.contact.fileCode)
      .subscribe(data => {
        this.fileData = data;
        this.contact.contacts += this.fileData.contacts;
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
