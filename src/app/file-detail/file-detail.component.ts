import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../service/file.service';
import { File } from '../model/file';
import { ErrorMessage } from '../model/error';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  id:number;
  fileCode:string;
  file:File;

    //TO DISPLAY ERROR MESSAGE
    errorMessage:ErrorMessage;

  constructor(private route: ActivatedRoute,private router: Router,
    private fileService: FileService) { }

    ngOnInit() {
      this.file = new File();
  
      this.fileCode = this.route.snapshot.params['fileCode'];
      
      this.fileService.getFile(this.fileCode)
        .subscribe(data => {
          console.log(data)
          this.file = data;
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
      this.router.navigate(['file']);
    }

}
