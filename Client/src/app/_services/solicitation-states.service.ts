import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitationStatesService {

  constructor(private http : HttpClient) { }

  addFielNumber(fields : any){
    return this.http.put<any>(environment.apiUrl+"SolicitationState/AddFielNumberDto", fields);
  }
}
