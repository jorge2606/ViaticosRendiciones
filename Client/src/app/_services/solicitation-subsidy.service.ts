import { SolicitationSubsidyBaseDto } from './../_models/solicitationSubsidy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSolicitationSubsidyDto } from '../_models/solicitationSubsidy';

@Injectable({
  providedIn: 'root'
})
export class SolicitationSubsidyService {

  constructor(private http : HttpClient) { }

  getAllSolicitationSubsidies(filter : any){
    return this.http.get<any>("http://localhost:63098/api/SolicitationSubsidy/page/",{params : filter});
  }

  createSolicitation(createSolicitationSubsidy : CreateSolicitationSubsidyDto){
    return this.http.post<any>("http://localhost:63098/api/SolicitationSubsidy/Create/",createSolicitationSubsidy);
  }

  updateSolicitation(solicitation : SolicitationSubsidyBaseDto){
      return this.http.put<any>("http://localhost:63098/api/SolicitationSubsidy/Update", solicitation);
  }

  getByIdSolicitation(solicitationSubsidyId : number){
    return this.http.get<any>("http://localhost:63098/api/SolicitationSubsidy/getBySolicitationId/"+solicitationSubsidyId);
  }

  delete(id : number){
     return this.http.delete<any>("http://localhost:63098/api/SolicitationSubsidy/Delete/"+id);
  }
}
