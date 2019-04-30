import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../../_models/reset-password';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryPasswordService } from '../../_services/recovery-password.service';
import { LoginComponent } from '../../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  model = new ResetPassword();
  idUserParam : number;
  codeParam : string;
  error: string;

  constructor(
      private route: ActivatedRoute, 
      private authService : AuthenticationService,
      private resetPass : RecoveryPasswordService,
      private router : Router,
      private toastrService : ToastrService,
      private spinnerService : NgxSpinnerService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(
      isLogued =>{
        if(!isLogued){
          //le asigno el id que extraigo de la url
          this.route.params.subscribe(
            x => {
              this.idUserParam = x.userId,
              this.codeParam = x.code
            }
          );
        }
      }
    );

  }

  onSubmit(){
    if (!this.model.password){
      this.error = "Ingrese una contraseña";
      return;
    }
    if (!this.model.passwordConfirm){
      this.error = "Confirme su contraseña";
      return;
    }

    if (this.model.password != this.model.passwordConfirm){
      this.error = "Las contraseñas no coinciden.";
      return;
    }
    this.model.userId = this.idUserParam;
    this.model.passwordResetToken = this.codeParam;
    this.spinnerService.show();
    this.resetPass.ResetPassword(this.model)
    .subscribe(
      x =>{
        this.spinnerService.hide();
        this.router.navigate([LoginComponent]);
    },error=>{
      if (error.error.response.errors){
        var e = error.error.response.errors || [];
        e.forEach(element => {
            this.toastrService.error(element.code+" "+element.description,'');
        });
      }
      this.spinnerService.hide();
    });
    
  }

}
