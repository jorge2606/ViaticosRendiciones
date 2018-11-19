import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPassword } from 'src/app/_models/passwords';
import { ResetPassword } from '../_models/reset-password';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {

  constructor(private http : HttpClient) { }

  ForgotPassword(passwordObj : ForgotPassword){
    this.http.post("http://localhost:63098/api/User/ForgotPassword/",passwordObj).subscribe(x =>
    console.log(x.toString())
    );
  }

  ResetPassword(passwordObj : ResetPassword){
    this.http.post("http://localhost:63098/api/User/ResetPassword/",passwordObj).subscribe(x =>
    console.log(x.toString())
    );
  }

}
