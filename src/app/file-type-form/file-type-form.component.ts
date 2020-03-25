import { Component, OnInit } from '@angular/core';
import { FileType } from '../model/fileType';
import { Router } from '@angular/router';
import { FileTypeService } from '../service/file-type.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-file-type-form',
  templateUrl: './file-type-form.component.html',
  styleUrls: ['./file-type-form.component.css']
})
export class FileTypeFormComponent implements OnInit {

  fileType:FileType =new FileType();
  submitted=false;


  //TO DISPLAY ERROR MESSAGE
  errorMessage:ErrorMessage;

  constructor(private fileTypeService:FileTypeService,private router:Router) {
        //TO PREVENT SUBMISSION WITH EMPTY FILE CODE
        this.fileType.fileTypeCode='';
   }

   ngOnInit(){
  }

  newFileType(): void {
    this.submitted = false;
    this.fileType = new FileType();
  }

  save() {
    this.fileTypeService.createFileType(this.fileType)
    /*
      .subscribe(data => console.log(data), 
      error => console.log(error));
      //error => alert(error));
    this.fileType = new FileType();
    this.gotoList();
    */
   .subscribe(data => {
    console.log(data)
    this.fileType = new FileType();
    this.gotoList();
  },
  //error => alert("Invalid Input Data"));
  //error => console.log(error));
  error => {
    console.log(error);
    this.errorMessage=error;
    alert(this.errorMessage.error.message);
  }
  )
  }

  cancel(){
    this.router.navigate(['/fileType']);
  }

  onSubmit() {
    if(this.fileType.fileTypeCode.length>0 && this.fileType.fileTypeCode.length==6){
      this.submitted = true;
      this.save(); 
    } 
    else{
      alert("File Type Code Incorrect");
    }
  }

  gotoList() {
    this.router.navigate(['/fileType']).then(() => {
      window.location.reload();
    })
  }

}
