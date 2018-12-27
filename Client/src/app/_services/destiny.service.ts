import { DestinyDto } from 'src/app/_models/destiny';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinyService {

  private subject = new Subject<DestinyDto[]>();
 
  constructor() { }
  
  sendMessage(message: DestinyDto[]) {
      this.subject.next(message);
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<DestinyDto[]> {
      return this.subject.asObservable();
  }
  
}
