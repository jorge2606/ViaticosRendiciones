import { CreateOrganismDto, UpdateOrganismDto } from './../_models/organism';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganismService {

  constructor(private http : HttpClient) { }

  getAllOrganism(){
    return this.http.get<any>('http://localhost:63098/api/Organism/GetAll');
  }

  getPaginator(page: number) {
    return this.http.get<any>('http://localhost:63098/api/Organism/page/' + page);
  }

  createOrganism(createOrganism : CreateOrganismDto){
      return this.http.post<any>('http://localhost:63098/api/Organism/Create',createOrganism);
  }

  updateOrganism(updateOrganism : UpdateOrganismDto){
    return this.http.put<any>('http://localhost:63098/api/Organism/Update',updateOrganism);
  }

  findById(id : number){
    return this.http.get<any>('http://localhost:63098/api/Organism/FindById/'+id);
  }

  deleteOrganism(id : number){
    return this.http.delete('http://localhost:63098/api/Organism/Delete/'+id);
  }
}
