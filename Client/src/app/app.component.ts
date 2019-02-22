import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  urlImage = "";
  idUser : number;
  islogged : Observable<boolean>;

  constructor(private authService : AuthenticationService,
              private titleService : Title){
                this.titleService.setTitle('Viáticos y Rendiciones');
              }
  
  ngOnInit(){
    this.islogged = this.authService.isLoggedIn;

    this.islogged.subscribe(x => {
      //si el usuario esta logueado
      if(x){
        this.idUser = this.authService.userId('id');
        this.urlImage = this.authService.urlFile(this.idUser, 25,25)+ "r=" + (Math.random() * 100) + 1;
      }else{
        this.urlImage = "";
      }
    });
  
  }
}
