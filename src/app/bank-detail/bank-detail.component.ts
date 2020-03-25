import { Component, OnInit } from '@angular/core';
import { Bank } from '../model/bank';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../service/bank.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {

  id:number;
  bankCode:string;
  bank:Bank;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  constructor(private route: ActivatedRoute,private router: Router,
    private bankService: BankService) { }

  ngOnInit() {
    this.bank = new Bank();

    this.bankCode = this.route.snapshot.params['bankCode'];
    
    this.bankService.getBank(this.bankCode)
      .subscribe(data => {
        console.log(data)
        this.bank = data;
      }, //error => console.log(error));
      //error => alert(error));
      error => {
        console.log(error);
        this.errorMessage=error;
        alert(this.errorMessage.error.message);
      }
      )
  }


  list(){
    this.router.navigate(['bank']);
  }


}
