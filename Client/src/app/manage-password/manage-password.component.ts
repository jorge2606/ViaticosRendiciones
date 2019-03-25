import { Component, OnInit } from '@angular/core';
import { ForgotPassword } from '../_models/passwords';
import { RecoveryPasswordService } from '../_services/recovery-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.css']
})
export class ManagePasswordComponent implements OnInit {

  model = new ForgotPassword();
  constructor(
            private managePassword : RecoveryPasswordService,
            private toastService : ToastrService
            ) { }

  onSubmit(){
    console.log(this.model);
    this.managePassword.ForgotPassword(this.model)
    .subscribe(x =>
      {this.toastService.success('Revise su bandeja de entrada, recibira un correo para restaurar su contraseña.');}
      ,e=> {
        console.log(e);
      }
      );
  }
  ngOnInit() {
  }

}
