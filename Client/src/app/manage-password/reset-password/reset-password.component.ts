import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../../_models/reset-password';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryPasswordService } from '../../_services/recovery-password.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  model = new ResetPassword();
  idUserParam : number;
  codeParam : string;

  constructor(private route: ActivatedRoute, private resetPass : RecoveryPasswordService,
    private router : Router) { }

  ngOnInit() {
      //le asigno el id que extraigo de la url
      this.route.queryParams.subscribe(
        x => {
          this.idUserParam = x.userId,
          this.codeParam = x.code
        }
      );
      
      console.log("user : "+ this.idUserParam);
      console.log("code : "+ this.codeParam);
  }

  onSubmit(){
    this.model.userId = this.idUserParam;
    this.model.passwordResetToken = this.codeParam;
    this.resetPass.ResetPassword(this.model);
    this.router.navigate([LoginComponent]);
  }

}
