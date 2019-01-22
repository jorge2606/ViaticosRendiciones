import { SolicitationSubsidyBaseDto, SolicitationIdDto } from './../_models/solicitationSubsidy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSolicitationSubsidyDto } from '../_models/solicitationSubsidy';

@Injectable({
  providedIn: 'root'
})
export class SolicitationSubsidyService {

  constructor(private http : HttpClient) { }

  getAllSolicitationSubsidiesSupervisor(filter : any){
    return this.http.get<any>("http://localhost:63098/api/SolicitationSubsidy/pageSupervisor/",{params : filter});
  }

  getAllSolicitationSubsidiesAgent(filter : any){
    return this.http.get<any>("http://localhost:63098/api/SolicitationSubsidy/pageAgent/",{params : filter});
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
  
  sendSolicitationByEmail(solicitation : SolicitationIdDto){
    return this.http.post("http://localhost:63098/api/SolicitationSubsidy/sendSolicitation/",solicitation);
  }

  Acepted(solicitation : SolicitationIdDto){
    return this.http.post<any>("http://localhost:63098/api/SolicitationSubsidy/AceptedSolicitation",solicitation);
  }

  refused(solicitation : SolicitationIdDto){
    return this.http.post<any>("http://localhost:63098/api/SolicitationSubsidy/RefusedSolicitation",solicitation);
  }
}
