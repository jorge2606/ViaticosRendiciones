import { CreateHolidayDto, FindByIdHolidayDto, UpdateHolidayDto } from './../_models/holiday';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor(private http : HttpClient) { }

  getPageHoliday(filters : any){
    return this.http.get<any>(environment.apiUrl+"Holiday/GetPageHoliday", {params : filters});
  }

  createHoliday(newHoliday : CreateHolidayDto){
    return this.http.post<any>(environment.apiUrl+"Holiday/create",newHoliday);
  }

  getByIdHoliday(id : number) {
    return this.http.get<FindByIdHolidayDto>(environment.apiUrl+"Holiday/getById/"+id);
  }

  updateHoliday(updateHoliday : UpdateHolidayDto){
    return this.http.put<any>(environment.apiUrl+"Holiday/update",updateHoliday);
  }

  deleteHoliday(id : number){
    return this.http.delete<any>(environment.apiUrl+"Holiday/Delete/"+id);
  }

}
