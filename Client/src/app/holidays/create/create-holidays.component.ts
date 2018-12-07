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

  constructor(private holidayService : HolidaysService) { }

  ngOnInit() {
    
  }

  onSubmit(){
    let dataSend = this.model.date.day+"/"+this.model.date.month+"/"+this.model.date.year;
    this.model.date = dataSend;
    this.holidayService.createHoliday(this.model).subscribe(
      x=> console.log("Create succesful"),
      errors =>this.errors = errors.error.date
    );
  }
}
