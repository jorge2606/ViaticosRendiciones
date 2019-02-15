import { AllPlaceDto } from './../_models/place';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<AllPlaceDto[]>(environment.apiUrl+"Place/GetAll/");
  }
}
