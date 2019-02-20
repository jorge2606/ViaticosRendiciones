import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HolidaysService } from './../../_services/holidays.service';
import { CreateHolidayDto } from './../../_models/holiday';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-holidays',
  templateUrl: './create-holidays.component.html',
  styleUrls: ['./create-holidays.component.css']
})
export class CreateHolidaysComponent implements OnInit {

  model = new CreateHolidayDto();
  errors = '';
  errorDatapicker = '';

  constructor(
                private holidayService: HolidaysService,
                private titleService :Title,
                private routerService : Router,
                private toastrService : ToastrService
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
      () => {
            this.routerService.navigate(['/holidays']);
            this.toastrService.success("La fecha '"+this.model.description+"' se ha guardado correctamente.",'',
              {positionClass : 'toast-top-center', timeOut : 3000});
          },
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

  msjValidEvent(){
  }

}
