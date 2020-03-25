import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../service/file.service';
import { File } from '../model/file';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.css']
})
export class FileUpdateComponent implements OnInit {

  id:number;
  fileCode:string;
  file:File;

  validEmail:boolean=false;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  constructor(private route:ActivatedRoute,private router:Router,private fileService:FileService) { }

  ngOnInit() {
    this.file=new File();

    this.fileCode=this.route.snapshot.params['fileCode'];

    this.fileService.getFile(this.fileCode)
    .subscribe(data => {
      console.log(data)
      this.file=data;
    },error => console.log(error));
    //error => alert(error));
  }

  updateFile(){
    this.fileService.updateFile(this.fileCode,this.file)
   .subscribe(data => {
    console.log(data)
    this.file = new File();
    this.goToList();
  },
  error => {
    console.log(error);
    this.errorMessage=error;
    alert(this.errorMessage.error.message);
  }
  )
  }

  onSubmit(){
    this.updateFile();
  }
  
  cancel(){
    this.router.navigate(['/file']);
  }


  goToList(){
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
