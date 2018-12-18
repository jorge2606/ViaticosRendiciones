import { HolidayBaseDto } from './../_models/holiday';
import { HolidaysService } from './../_services/holidays.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../modals/modals.component';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent implements OnInit {

  filters = { page : 0, description : "", date : null}
  holidays : HolidayBaseDto[];
  
  //paginator
  col_size : number;
  itemsPerPage : number = 10;
    //
  constructor(
    private holidayService : HolidaysService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.filters.date = "";
    this.getAllHolidays(this.filters);
  }

  getAllHolidays(filters : any){
    this.holidayService.getPageHoliday(filters).subscribe(
      x => {
            this.holidays = x.list;
            this.col_size = x.totalRecords;
            }
    );
  }

  filter(){    
      if (this.filters.date == null 
            || this.filters.date.day === undefined 
            || this.filters.date.month === undefined 
            || this.filters.date.year === undefined)
            {
              this.filters.date = "";
              this.getAllHolidays(this.filters);
              return;
            }
    let dataSend = "";
    let auxDate = {
        day : this.filters.date.day,
        month : this.filters.date.month,
        year : this.filters.date.year
    };
    dataSend = this.filters.date.month+"/"+this.filters.date.day+"/"+this.filters.date.year;
    this.filters.date = dataSend;
    this.getAllHolidays(this.filters);
    this.filters.date = auxDate;
  }

  loadPage(page : any) {
      if (page > 0) {
        this.filters.page = page - 1;
        this.getAllHolidays(this.filters);
      }
  }

    //MODALS
    openEliminar(holiday : HolidayBaseDto) {
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.Encabezado = "Eliminar";
      let dateToShow = new Date(Date.parse(holiday.date));

      modalRef.componentInstance.Contenido = "¿Desea eliminar feriado : " + holiday.description + " " + 
      dateToShow.getDate()+"/"+ (dateToShow.getMonth() + 1)+"/"+ dateToShow.getFullYear()+ "?";

      modalRef.componentInstance.GuardaroEliminar = "Eliminar";
      modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
      modalRef.componentInstance.MsgClose = "Cancelar";
      modalRef.result.then(() => {
        this.holidayService.deleteHoliday(holiday.id).subscribe(
          () => {
           this.getAllHolidays(this.filters);
           debugger
          },
          error => {
              console.log("error", error);
          }
      );
      },
        () => {
          console.log('Backdrop click');
      })
    }

}
