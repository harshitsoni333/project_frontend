import { Component, OnInit } from '@angular/core';
import { FileService } from '../service/file.service';
import { Router } from '@angular/router';
import { File } from '../model/file';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  file:File =new File();
  submitted=false;

  validEmail:boolean=false;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  constructor(private fileService:FileService,private router:Router) { 
    //TO PREVENT SUBMISSION WITH EMPTY FILE CODE
    this.file.fileCode='';
  }

  ngOnInit(){
  }

  newFile(): void {
    this.submitted = false;
    this.file = new File();
  }

  save() {
    this.fileService.createFile(this.file)
    /*
      .subscribe(data => console.log(data), 
      error => console.log(error));
      //error => alert(error));
    this.file = new File();
    this.gotoList();
    */
   .subscribe(data => {
    console.log(data)
    this.file = new File();
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
    this.router.navigate(['/file']);
  }

  onSubmit() {
    if(this.file.fileCode.length>0){
      this.submitted = true;
      this.save(); 
    } 
    else if(this.file.fileCode.length==0){
      alert("File Code Too Short");
    }
  }

  gotoList() {
    this.router.navigate(['/file']).then(() => {
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
