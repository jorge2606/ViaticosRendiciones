import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  urlImage = "";
  idUser : number;

  constructor(private authService : AuthenticationService,
              private titleService : Title){}
  
  ngOnInit(){
    this.titleService.setTitle('Viáticos y Rendiciones');
    this.idUser = this.authService.userId('id');
    this.urlImage = this.authService.urlFile(this.idUser, 25,25)+ "r=" + (Math.random() * 100) + 1;
  }
}
