import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitationStatesService {

  constructor(private http : HttpClient) { }

  addFielNumber(fields : any){
    return this.http.put<any>("http://localhost:63098/api/SolicitationState/AddFielNumberDto", fields);
  }
}
