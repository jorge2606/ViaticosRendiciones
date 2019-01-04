import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http : HttpClient) { }

  getAllCountries(){
    return this.http.get<any>('http://localhost:63098/api/Country/GetAllCountry');
  }
}
