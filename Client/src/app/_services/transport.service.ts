import { CreateTransportDto, CarIsBeingUsedByOtherSolicitation } from 'src/app/_models/transport';
import { UpdateTransportDto } from './../_models/transport';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http : HttpClient) { }

  getPaginator(page: number) {
    return this.http.get<any>('http://localhost:63098/api/Transport/page/' + page);
  }

  findByIdTransport(id : number){
    return this.http.get<any>('http://localhost:63098/api/Transport/FindByIdTransport/'+id);
  }

  updateTransport(updateTransport : UpdateTransportDto){
    return this.http.put<any>('http://localhost:63098/api/Transport/Update/',updateTransport);
  }

  createTransport(CreateTransport : CreateTransportDto){
    return this.http.post<any>('http://localhost:63098/api/Transport/Create/',CreateTransport);
  }

  deleteTransport(id : number){
    return this.http.delete<any>('http://localhost:63098/api/Transport/Delete/'+id);
  }

  getAll(){
    return this.http.get<any>('http://localhost:63098/api/Transport/GetAll/');
  }

  carIsBeingUsedByOtherSolicitation(transport : CarIsBeingUsedByOtherSolicitation){
    return this.http.post<boolean>("http://localhost:63098/api/Transport/CarIsBeingUsedByOtherSolicitation", transport);
  }


}
