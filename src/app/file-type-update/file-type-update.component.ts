import { Component, OnInit } from '@angular/core';
import { FileType } from '../model/fileType';
import { ActivatedRoute, Router } from '@angular/router';
import { FileTypeService } from '../service/file-type.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-file-type-update',
  templateUrl: './file-type-update.component.html',
  styleUrls: ['./file-type-update.component.css']
})
export class FileTypeUpdateComponent implements OnInit {

  id:number;
  fileTypeCode:string;
  fileType:FileType;


    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;
    
  constructor(private route:ActivatedRoute,private router:Router,private fileTypeService:FileTypeService) { }

  ngOnInit() {
    this.fileType=new FileType();

    this.fileTypeCode=this.route.snapshot.params['fileTypeCode'];

    this.fileTypeService.getFileType(this.fileTypeCode)
    .subscribe(data => {
      console.log(data)
      this.fileType=data;
    },//error => console.log(error));
    //error => alert(error));

    error => {
      console.log(error);
      this.errorMessage=error;
      alert(this.errorMessage.error.message);
    }
    )
  }

  updateFileType(){
    this.fileTypeService.updateFileType(this.fileTypeCode,this.fileType)
    /*
    .subscribe(data => console.log(data), 
    //error => console.log(error));
    error => alert(error));
    this.fileType=new FileType();
    this.goToList();
    */
   .subscribe(data => {
     console.log(data)
     this.fileType=new FileType();
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
    this.updateFileType();
  }
  
  cancel(){
    this.router.navigate(['/fileType']);
  }


  goToList(){
    this.router.navigate(['/fileType']).then(() => {
      window.location.reload();
    })
  }

}
