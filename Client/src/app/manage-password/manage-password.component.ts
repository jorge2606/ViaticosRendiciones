import { Component, OnInit } from '@angular/core';
import { ForgotPassword } from '../_models/passwords';
import { RecoveryPasswordService } from '../_services/recovery-password.service';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.css']
})
export class ManagePasswordComponent implements OnInit {

  model = new ForgotPassword();
  constructor(private managePassword : RecoveryPasswordService) { }

  onSubmit(){
    console.log(this.model);
    this.managePassword.ForgotPassword(this.model);
  }
  ngOnInit() {
  }

}
