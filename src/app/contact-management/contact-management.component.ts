import { Contact } from './../model/contact';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { ExcelService } from '../service/excel.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent implements OnInit {

  contact: Observable<Contact[]>;
  isAdmin:string; //TO CHECK USER LOGGED IN IS ADMIN OR NOT

  key: string = 'name'; //set default
  reverse: boolean = false;

  p: Number = 1;
  count: Number = 5;

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private contactService:ContactService,private router:Router,private hardcodedAuthenticationService:HardcodedAuthenticationService,private basicAuthenticationService:BasicAuthenticationService,private excelService:ExcelService) {
    this.isAdmin=sessionStorage.getItem('isAdmin'); //GET ADMIN VALUE FUNCTION MADE IN THE SERVICE TO GET THE CURRENT ISADMIN VALUE BUT RETURNING A STRING VALUE
    console.log(this.isAdmin);
   }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.contact=this.contactService.getContactList();
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
        //error => alert(error));
  }


  updateContact(id: number){
    this.router.navigate(['update-contact', id]);
  }

  detailContact(id: number){
    this.router.navigate(['detail-contact', id]);
  }

  clickMethod(id:number) {
    if(confirm("Are you sure to delete Contact: "+id)) {
      //console.log("Implement delete functionality here");
      this.deleteContact(id);
    }
  }

  export(){
    //this.excelService.getExport().subscribe(data => saveAs(data, `pdf report.pdf`));
    this.excelService.getExport().subscribe(data => saveAs(data, `xlsx report.xlsx`));
  }




}
