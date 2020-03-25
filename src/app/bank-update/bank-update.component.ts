import { Component, OnInit } from '@angular/core';
import { Bank } from '../model/bank';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../service/bank.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-bank-update',
  templateUrl: './bank-update.component.html',
  styleUrls: ['./bank-update.component.css']
})
export class BankUpdateComponent implements OnInit {

  id:number;
  bankCode:string;
  bank:Bank;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  constructor(private route:ActivatedRoute,private router:Router,private bankService:BankService) { }

  ngOnInit() {
    this.bank=new Bank();

    this.bankCode=this.route.snapshot.params['bankCode'];

    this.bankService.getBank(this.bankCode)
    .subscribe(data => {
      console.log(data)
      this.bank=data;
    },//error => console.log(error));
    error => alert(error));
  }

  updateBank(){
    this.bankService.updateBank(this.bankCode,this.bank)
    /*
    .subscribe(data => console.log(data), 
    error => console.log(error));
    //error => alert(error));
    this.bank=new Bank();
    this.goToList();
    */

   .subscribe(data => {
    console.log(data)
    this.bank = new Bank();
    this.goToList();
  },
  //error => alert("Invalid Input Data"));
  error => {
    console.log(error);
    this.errorMessage=error;
    alert(this.errorMessage.error.message);
  }
  )
  }

  onSubmit(){
    this.updateBank();
  }
  
  cancel(){
    this.router.navigate(['/bank']);
  }


  goToList(){
    this.router.navigate(['/bank']).then(() => {
      window.location.reload();
    })
  }

}
