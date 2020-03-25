import { FileType } from './../model/fileType';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileTypeService } from '../service/file-type.service';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-file-type-detail',
  templateUrl: './file-type-detail.component.html',
  styleUrls: ['./file-type-detail.component.css']
})
export class FileTypeDetailComponent implements OnInit {

  id:number;
  fileTypeCode:string;
  fileType:FileType;


  //TO DISPLAY ERROR MESSAGE
  errorMessage:ErrorMessage;

  constructor(private route: ActivatedRoute,private router: Router,
    private fileTypeService: FileTypeService) { }

    ngOnInit() {
      this.fileType = new FileType();
  
      this.fileTypeCode = this.route.snapshot.params['fileTypeCode'];
      
      this.fileTypeService.getFileType(this.fileTypeCode)
        .subscribe(data => {
          console.log(data)
          this.fileType = data;
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
      this.router.navigate(['fileType']);
    }

}
