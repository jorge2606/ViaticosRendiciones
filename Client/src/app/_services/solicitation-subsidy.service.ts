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

  createAccountFor(createSolicitationSubsidy : CreateSolicitationSubsidyDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/CreateAccountFor/",createSolicitationSubsidy);
  }
  updateSolicitation(solicitation : SolicitationSubsidyBaseDto){
      return this.http.put<any>(environment.apiUrl+"SolicitationSubsidy/Update", solicitation);
  }

  getByIdSolicitation(solicitationSubsidyId : number){
    return this.http.get<any>(environment.apiUrl+"SolicitationSubsidy/getBySolicitationId/"+solicitationSubsidyId);
  }
  getBySolicitationIdWhitState(solicitationSubsidyId : number){
    return this.http.get<any>(environment.apiUrl+"SolicitationSubsidy/GetBySolicitationIdWhitState/"+solicitationSubsidyId);
  }
  delete(id : number){
     return this.http.delete<any>(environment.apiUrl+"SolicitationSubsidy/Delete/"+id);
  }

  finalizeSubsidy(id : number){
    return this.http.delete<any>(environment.apiUrl+"SolicitationSubsidy/FinalizeSubsidy/"+id);
 }

  
  sendSolicitationByEmail(solicitation : SolicitationIdDto){
    return this.http.post(environment.apiUrl+"SolicitationSubsidy/sendSolicitation/",solicitation);
  }

  sendAccountForToSupervisor(solicitation : SolicitationIdDto){
    return this.http.post(environment.apiUrl+"SolicitationSubsidy/sendAccountForToSupervisor/",solicitation);
  }

  acepted(solicitation : SolicitationIdDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/AceptedSolicitation",solicitation);
  }

  aceptedAccountForSolicitation(solicitation : SolicitationIdDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/AceptedAccountForSolicitation",solicitation);
  }
  refused(solicitation : SolicitationIdDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/RefusedSolicitation",solicitation);
  }

  refusedAccountForSolicitation(solicitation : SolicitationIdDto){
    return this.http.post<any>(environment.apiUrl+"SolicitationSubsidy/RefusedAccountForSolicitation",solicitation);
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

  getImageRefundExpenditure(expId : number, width : number, height : number){
    return this.http.get<any>(environment.apiUrl+"File/ExpenditureRefund/"+expId+"/"+width+"/"+height);
  }


  getImageHolographSignUrl(supervisorId : number, width : number, height : number){
    return this.http.get<any>(environment.apiUrl+"File/HolographSignUrl/"+supervisorId+"/"+width+"/"+height);
  }


}
