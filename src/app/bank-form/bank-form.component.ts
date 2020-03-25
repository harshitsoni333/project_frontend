import { Component, OnInit } from '@angular/core';
import { Bank } from '../model/bank';
import { BankService } from '../service/bank.service';
import { Router } from '@angular/router';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {

  bank:Bank =new Bank();
  submitted=false;

  validEmail:boolean=false;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  constructor(private bankService:BankService,private router:Router) { 
    //TO PREVENT SUBMISSION WITH EMPTY FILE CODE
    this.bank.bankCode='';
  }

  ngOnInit() {
  }

  newBank(): void {
    this.submitted = false;
    this.bank = new Bank();
  }

  save() {

    this.bankService.createBank(this.bank)
    /*
      .subscribe(data => console.log(data), 
      error => console.log(error));
      //error => alert(error));
    this.bank = new Bank();
    this.gotoList();
    */

   .subscribe(data => {
    console.log(data)
    this.bank = new Bank();
    this.gotoList();
  },
  //error => alert("Invalid Input Data"));
  error => {
    console.log(error);
    this.errorMessage=error;
    alert(this.errorMessage.error.message);
  }
  )
  }

  cancel(){
    this.router.navigate(['/bank']);
  }

  onSubmit() {
    if(this.bank.bankCode.length>0){
      this.submitted = true;
      this.save(); 
    } 
    else if(this.bank.bankCode.length==0){
      alert("Bank Code Too Short");
    }
  }

  gotoList() {
    this.router.navigate(['/bank']).then(() => {
      window.location.reload();
    })
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
