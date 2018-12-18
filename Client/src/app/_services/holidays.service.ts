import { CreateHolidayDto, FindByIdHolidayDto, UpdateHolidayDto } from './../_models/holiday';
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

  getByIdHoliday(id : number) {
    return this.http.get<FindByIdHolidayDto>("http://localhost:63098/api/Holiday/getById/"+id);
  }

  updateHoliday(updateHoliday : UpdateHolidayDto){
    return this.http.put<any>("http://localhost:63098/api/Holiday/update/",updateHoliday);
  }

  deleteHoliday(id : number){
    return this.http.delete<any>("http://localhost:63098/api/Holiday/Delete/"+id);
  }

}
