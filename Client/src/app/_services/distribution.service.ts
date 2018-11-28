import { FindByIdDistributionDto, UpdateDistributionDto, CreateDistributionDto } from './../_models/distributions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(private http: HttpClient) { }

  getPaginator(page: number) {
    return this.http.get<any>('http://localhost:63098/api/Distribution/page/' + page);
  }

  allDistribution(){
    return this.http.get<any>('http://localhost:63098/api/Distribution/AllDistributions');
  }
  findByIdDistribution(distributionId : number){
    return this.http.get<FindByIdDistributionDto>('http://localhost:63098/api/Distribution/FindByIdDistribution/'+distributionId)
  }

  updateDistribution(updateDistribution : UpdateDistributionDto){
    return this.http.put('http://localhost:63098/api/Distribution/UpdateDistribution',updateDistribution);
  }
  
  deleteDistribution(distributionId : number){
    return this.http.delete('http://localhost:63098/api/Distribution/DeleteDistribution/'+distributionId);
  }

  creteDistribution(createDistribution : CreateDistributionDto){
      return this.http.post('http://localhost:63098/api/Distribution/CreateDistribution',createDistribution);
  }

}
