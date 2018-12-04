import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitationSubsidyService {

  constructor(private http : HttpClient) { }

  getAllSolicitationSubsidies(filter : any){
    return this.http.get<any>("http://localhost:63098/api/SolicitationSubsidy/page/",{params : filter});
  }

}
