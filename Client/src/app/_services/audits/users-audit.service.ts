import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersAuditService {

  constructor(private http: HttpClient) { }

  fetchModifiedOfUser(userId : number){
    return this.http.get<any>('http://localhost:63098/api/Audit/UserAudits/' + userId);
  }
  
}
