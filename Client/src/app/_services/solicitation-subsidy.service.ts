import { SolicitationSubsidyBaseDto, SolicitationIdDto } from './../_models/solicitationSubsidy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSolicitationSubsidyDto } from '../_models/solicitationSubsidy';
import { overlapingDto } from '../_models/overlaping';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitationSubsidyService {

  constructor(private http : HttpClient) { }

  getAllSolicitationSubsidiesSupervisor(filter : any){
    return this.http.get<any>(environment.apiUrl+"SolicitationSubsidy/pageSupervisor/",{params : filter});
  }

  getAllSolicitationSubsidiesAgent(filter : any){
    return this.http.get<any>(environment.apiUrl+"SolicitationSubsidy/pageAgent/",{params : filter});
  }

  createSolicitation(createSolicitationSubsidy : CreateSolicitationSubsidyDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/Create/",createSolicitationSubsidy);
  }

  updateSolicitation(solicitation : SolicitationSubsidyBaseDto){
      return this.http.put<any>(environment.apiUrl+"SolicitationSubsidy/Update", solicitation);
  }

  getByIdSolicitation(solicitationSubsidyId : number){
    return this.http.get<any>(environment.apiUrl+"SolicitationSubsidy/getBySolicitationId/"+solicitationSubsidyId);
  }

  delete(id : number){
     return this.http.delete<any>(environment.apiUrl+"SolicitationSubsidy/Delete/"+id);
  }
  
  sendSolicitationByEmail(solicitation : SolicitationIdDto){
    return this.http.post(environment.apiUrl+"SolicitationSubsidy/sendSolicitation/",solicitation);
  }

  Acepted(solicitation : SolicitationIdDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/AceptedSolicitation",solicitation);
  }

  refused(solicitation : SolicitationIdDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/RefusedSolicitation",solicitation);
  }

  overlapingDates(overlapDate : overlapingDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/overlaping",overlapDate);
  }

  SolicitationApprovedBySupervisorId(id : number){
    return this.http.get<any>(environment.apiUrl+"SolicitationSubsidy/SolicitationApprovedBySupervisorId/"+id);
  }

  wichStateSolicitation(solicitationId : number){
    return this.http.get<any>(environment.apiUrl+"SolicitationSubsidy/WichStateSolicitation/"+solicitationId);
  }

  getImageRefundExpenditure(expId : number){
    return this.http.get<any>(environment.apiUrl+"File/ExpenditureRefund/image/"+expId);
  }
}
