import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupervisorUserAgentBaseDto } from '../_models/supervisorUserAgent';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class SupervisorUserAgentService {

  constructor(private http : HttpClient) { }

  create(supervisorAgent : SupervisorUserAgentBaseDto[]){
    return this.http.post<any>("http://localhost:63098/api/SupervisorUserAgent/Create/",supervisorAgent);
  }

  getAll(){
    return this.http.get<any>("http://localhost:63098/api/SupervisorUserAgent/AllSupervisorAgents");
  }
}
