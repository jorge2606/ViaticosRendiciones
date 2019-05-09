import { DateDto } from './../_models/holiday';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http : HttpClient
  ) { }

  reportSolicitationByDestiniesAndDates(filters : any){
    var endDate = JSON.stringify({
      'day': filters.endDate.day,
      'month' : filters.endDate.month,
      'year' : filters.endDate.year
    });

    var startDate = JSON.stringify({
      'day': filters.startDate.day,
      'month' : filters.startDate.month,
      'year' : filters.startDate.year
    });
    var param = new HttpParams({
      fromObject :{
        'cityId' : filters.cityId,
        'countryId' : filters.countryId,
        'endDate' : endDate,
        'provinceId' : filters.provinceId,
        'startDate' : startDate 
      }
    });
    return this.http.get<any>(environment.apiUrl+"Report/Report_SolicitationByDestiniesAndDates",{params: param});
  }
}
