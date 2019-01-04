import { AllPlaceDto } from './../_models/place';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<AllPlaceDto[]>("http://localhost:63098/api/Place/GetAll/");
  }
}
