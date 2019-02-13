import { Title } from '@angular/platform-browser';
import { Notifications } from './../../_models/notifications';
import { HolidaysService } from './../../_services/holidays.service';
import { CreateHolidayDto } from './../../_models/holiday';
import { Component, OnInit } from '@angular/core';
import { I18n, CustomLanguageDatepickerI18n } from '@ng-bootstrap/ng-bootstrap/datepicker/CustomLanguagedatepicker-i18n';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-holidays',
  templateUrl: './create-holidays.component.html',
  styleUrls: ['./create-holidays.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomLanguageDatepickerI18n}] 
})
export class CreateHolidaysComponent implements OnInit {

  model = new CreateHolidayDto();
  errors = '';
  errorDatapicker = '';

  constructor(
                private holidayService: HolidaysService,
                private titleService :Title
                ) { 
                    this.titleService.setTitle('Crear Feriado');
                }

  ngOnInit() {

  }

  onSubmit() {
    if (!this.validateDate()) {
      return;
    }

    this.errorDatapicker = '';

    this.holidayService.createHoliday(this.model).subscribe(
      x => console.log("Create succesful"),
      errors => this.errors = errors.error.date
    );

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
