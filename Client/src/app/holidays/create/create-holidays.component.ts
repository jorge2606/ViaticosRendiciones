import { Notifications } from './../../_models/notifications';
import { HolidaysService } from './../../_services/holidays.service';
import { CreateHolidayDto } from './../../_models/holiday';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-holidays',
  templateUrl: './create-holidays.component.html',
  styleUrls: ['./create-holidays.component.css']
})
export class CreateHolidaysComponent implements OnInit {

  model = new CreateHolidayDto();
  errors = '';
  errorDatapicker = '';

  constructor(private holidayService : HolidaysService) { }

  ngOnInit() {
    
  }

  onSubmit(){
    if (this.model.date.day === undefined 
      || this.model.date.month === undefined 
      || this.model.date.year === undefined
      || this.model.date.day > 31 && this.model.date.month < 1
      || this.model.date.month > 12 && this.model.date.month < 1
      || this.model.date.year > 2099 && this.model.date.year < 1912)
      {
        this.errorDatapicker = 'Formato de Fecha Incorrecto'
        return;
      }    
    
      this.errorDatapicker = '';
    
      this.holidayService.createHoliday(this.model).subscribe(
        x=> console.log("Create succesful"),
        errors =>this.errors = errors.error.date
      );
  
  }

  validation(){
    if (this.model.date.day === undefined 
      || this.model.date.month === undefined 
      || this.model.date.year === undefined
      || this.model.date.day == null 
      || this.model.date.month == null 
      || this.model.date.year == null
      || this.model.date.day > 31 && this.model.date.month < 1
      || this.model.date.month > 12 && this.model.date.month < 1
      || this.model.date.year > 2099 && this.model.date.year < 1912)
      {
        this.errorDatapicker = 'Formato de Fecha Incorrecto'
        return;
      }   
      this.errorDatapicker = '';
  }

}
