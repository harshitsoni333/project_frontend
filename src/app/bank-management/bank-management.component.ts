import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Bank } from '../model/bank';
import { BankService } from '../service/bank.service';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-bank-management',
  templateUrl: './bank-management.component.html',
  styleUrls: ['./bank-management.component.css']
})
export class BankManagementComponent implements OnInit {

  bank: Observable<Bank[]>;
  isAdmin:string; //TO CHECK LOGIN IS BY ADMIN OR NOT

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: Number = 1;
  count: Number = 5;

  constructor(private bankService:BankService,private router:Router,private hardcodedAuthenticationService:HardcodedAuthenticationService) {
    this.isAdmin=sessionStorage.getItem('isAdmin'); //GET ADMIN VALUE FUNCTION MADE IN THE SERVICE TO GET THE CURRENT ISADMIN VALUE BUT RETURNING A STRING VALUE
    console.log(this.isAdmin);
   }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.bank=this.bankService.getBankList();
  }

  deleteBank(bankCode: string) {
    this.bankService.deleteBank(bankCode)
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

  updateBank(bankCode: string){
    this.router.navigate(['update-bank', bankCode]);
  }

  detailBank(bankCode: string){
    this.router.navigate(['detail-bank', bankCode]);
  }
  clickMethod(bankCode: string){
    if(confirm('Are you sure to delete Bank: '+bankCode)){
      //console.log("Implement delete functionality here");
      this.deleteBank(bankCode);
    }
  }

}
