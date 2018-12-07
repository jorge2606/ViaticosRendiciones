import { HolidaysService } from './../_services/holidays.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  filters = { page : 0, description : "", date : null}
  holidays : any;
  //paginator
  col_size : number;
  itemsPerPage : number = 10;
  //
  constructor(
    private holidayService : HolidaysService
  ) { }

  ngOnInit() {
    this.getAllHolidays(this.filters);
  }

  getAllHolidays(filters : any){
    this.holidayService.getPageHoliday(filters).subscribe(
      x => {
            this.holidays = x.list;
            this.col_size = x.TotalRecords;
            }
    );
  }
  filter(){
    let dataSend = this.filters.date.day+"/"+this.filters.date.month+"/"+this.filters.date.year;
    this.filters.date = dataSend;
    this.getAllHolidays(this.filters);
  }

}
