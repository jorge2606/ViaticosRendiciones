import { CreateExpenditureDto, UpdateExpenditureDto } from './../_models/expenditure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  constructor(private http : HttpClient) { }

  getPaginator(page: number) {
    return this.http.get<any>('http://localhost:63098/api/Expenditure/page/' + page);
  }

  createExpenditure(createExpenditure : CreateExpenditureDto){
      return this.http.post<any>('http://localhost:63098/api/Expenditure/Create',createExpenditure);
  }

  findByIdExpenditure(id : number){
    return this.http.get<any>('http://localhost:63098/api/Expenditure/FindById/'+id);
  }

  updateExpenditure(updateExpenditure : UpdateExpenditureDto){
    return this.http.put<any>('http://localhost:63098/api/Expenditure/Update/',updateExpenditure);
  }

  deleteExpenditure(id : number){
    return this.http.delete<any>('http://localhost:63098/api/Expenditure/Delete/'+id);
  }
}
