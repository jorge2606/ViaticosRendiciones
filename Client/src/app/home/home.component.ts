import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  id: number;
  roles : any[];

  constructor(
        private userService: UserService,
        private route : ActivatedRoute,
        private authService : AuthenticationService,
        private titleService : Title) {}

  ngOnInit() {
    this.titleService.setTitle('Inicio');
    
    this.authService.userId('rolesNames')
    .forEach(ROL => {
      this.roles = ROL.normalizedName;
    });;
  }

}



