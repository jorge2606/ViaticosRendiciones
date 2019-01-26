import { HolidaysComponent } from './../holidays.component';
import { UpdateHolidayDto } from './../../_models/holiday';
import { HolidaysService } from './../../_services/holidays.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-holidays',
  templateUrl: './modify-holidays.component.html',
  styleUrls: ['./modify-holidays.component.css']
})
export class ModifyHolidaysComponent implements OnInit {

  id : number;
  model = new UpdateHolidayDto();
  date : Date;
  errorDatapicker = '';

  constructor(private route : ActivatedRoute, 
              private holidayService : HolidaysService,
              private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      x => this.id = x.id
    );

    this.holidayService.getByIdHoliday(this.id).subscribe(
      x => {
              this.model = x;
            }
    );
  }

  onSubmit() {
    if (!this.validateDate()){
      this.model.id = this.id;
      this.holidayService.updateHoliday(this.model).subscribe(
        () => {
          this.router.navigate(['/holidays']);
        },
          () => {
        }      
      );
    }

  }

  validateDate(){
    if (this.model.date &&
      (!this.model.date.day
        || !this.model.date.month
        || !this.model.date.year
        || this.model.date.day > 31 || this.model.date.month < 1
        || this.model.date.month > 12 || this.model.date.month < 1
        || this.model.date.year > 2099 || this.model.date.year < 1912)) {
      this.errorDatapicker = 'Formato de Fecha Incorrecto'
      return false;
    }
    this.errorDatapicker = '';
    return true;
  }

  

}
