import { CreateHolidayDto } from './../_models/holiday';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor(private http : HttpClient) { }

  getPageHoliday(filters : any){
    return this.http.get<any>("http://localhost:63098/api/Holiday/GetPageHoliday", {params : filters});
  }

  createHoliday(newHoliday : CreateHolidayDto){
    return this.http.post<any>("http://localhost:63098/api/Holiday/create",newHoliday);
  }
}
