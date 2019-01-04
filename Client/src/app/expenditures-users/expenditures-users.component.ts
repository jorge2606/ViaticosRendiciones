import { ExpenditureUserBaseDto } from './../_models/expenditureUser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExpendituresUserService } from '../_services/expenditures-user.service';

@Component({
  selector: 'app-expenditures-users',
  templateUrl: './expenditures-users.component.html',
  styleUrls: ['./expenditures-users.component.css']
})
export class ExpendituresUsersComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
  }

}
