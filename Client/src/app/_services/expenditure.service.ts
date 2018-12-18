import { CreateExpenditureDto, UpdateExpenditureDto } from './../_models/expenditure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Expenditure } from '../_models/solicitationSubsidy';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  private subject = new Subject<any[]>();
  
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

  getAll(){
    return this.http.get<any>("http://localhost:63098/api/Expenditure/GetAll/");
  }

  sendMessage(message: any[]) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any[]> {
    return this.subject.asObservable();
  }

}
