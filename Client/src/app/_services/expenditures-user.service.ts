import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpendituresUserService {

  constructor(private http : HttpClient) { }

  getByIdSolicitationSubsidy(id : number){
    return this.http.get<any>("http://localhost:63098/api/Expenditure/GetByIdSolicitationSubsidy/{id}"+id);
  }

  delete(id : number){
    return this.http.delete<any>("http://localhost:63098/api/Expenditure/Delete/"+id);
  }
}
