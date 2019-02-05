import { HttpClient } from '@angular/common/http';
import { DestinyDto } from 'src/app/_models/destiny';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinyService {

  private subject = new Subject<DestinyDto[]>();
 
  constructor(private http : HttpClient) { }
  
  delete(id : number){
      return this.http.delete<any>("http://localhost:63098/api/Destiny/Delete/"+id);
  }
  sendMessage(message: DestinyDto[]) {
      this.subject.next(message);
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<DestinyDto[]> {
      return this.subject.asObservable();
  }

  get_destinies(solicitationId : number){
    return this.http.get<any>("http://localhost:63098/api/Destiny/Get_Destiny/"+solicitationId);
  }
  
}
