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
