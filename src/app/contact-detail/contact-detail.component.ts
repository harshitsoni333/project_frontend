import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  id:number;
  contact:Contact;

  constructor(private route: ActivatedRoute,private router: Router,
    private contactService: ContactService) { }

  ngOnInit() {
    this.contact = new Contact();

    this.id = this.route.snapshot.params['id'];
    
    this.contactService.getContact(this.id)
      .subscribe(data => {
        console.log(data)
        this.contact = data;
      }, error => console.log(error));
      //error => console.log(error));
  }

  list(){
    this.router.navigate(['contact']);
  }

}
