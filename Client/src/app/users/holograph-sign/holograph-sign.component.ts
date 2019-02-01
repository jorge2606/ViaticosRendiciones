import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessBetweenCompService } from 'src/app/_services/mess-between-comp.service';
import { UserService } from 'src/app/_services/user.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-holograph-sign',
  templateUrl: './holograph-sign.component.html',
  styleUrls: ['./holograph-sign.component.css']
})
export class HolographSignComponent implements OnInit {

  constructor(private authService : AuthenticationService, 
    private messaBetweenComp : MessBetweenCompService,
    private userService : UserService,
    private http : HttpClient
    ) { }

    //image
    uploader:FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl; 
    idUser : number;
    urlImage : string;
    subject = new Subject<any>();

    fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
    }

    ngOnInit() {
      //image
      this.initializeUploader();
      this.idUser = this.authService.userId('id');
      this.urlImage = this.urlFile(this.idUser,200,200)  + "r=" + (Math.random() * 100) + 1;
    }

    urlFile(userId : number, width : number, height: number){
      return "http://localhost:63098/api/File/HolographSign/"+userId+"/"+width+"/"+height;
    }

    initializeUploader() {
      this.uploader = new FileUploader({
      url: this.baseUrl+'HolographSignUpdate/',
      authToken: 'Bearer ' + this.authService.userId('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          this.urlImage = this.urlFile(this.idUser,200,200) + "r=" + (Math.random() * 100) + 1;
          //this.messaBetweenComp.sendMessage(this.urlImage); --> envia a la miniatura del navar 
        }
      }    
    }

    url = '';
    onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event : any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        }
      }
    }


    removePreview(){
      this.url='';
      this.uploader.cancelAll();
      this.uploader.clearQueue();
    }

    deleteProfilePhoto(id: number) {
      return this.http.delete('http://localhost:63098/api/File/removeHolographSign/' + id);
    }

    eliminarPerfil(){
      let url = this.urlFile(this.idUser,200,200);
      this.deleteProfilePhoto(this.idUser).subscribe(
      data => {
        this.urlImage =  url + "r=" + (Math.random() * 100) + 1,
        this.url = '',
        this.messaBetweenComp.sendMessage(this.urlImage),
        console.log("POST Request is successful ", data)
    },
    error => {
      console.log("Rrror", error);
    }
    );

    }

}
