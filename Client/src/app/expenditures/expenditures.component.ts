import { Component, OnInit } from '@angular/core';
import { ExpenditureService } from '../_services/expenditure.service';
import { ExpenditureBaseDto } from '../_models/expenditure';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['./expenditures.component.css']
})
export class ExpendituresComponent implements OnInit {

  page = 0;
  col_size : number;
  expenditures : ExpenditureBaseDto[];
  error : any;
  itemsPerPage : number = 10;

  constructor(private expenditureService : ExpenditureService,
    private modalService : NgbModal) { }

  ngOnInit() {
    this.getAllExpenditure(this.page); 
  }

  loadPage(page : number){
    if (page != 0){
      this.getAllExpenditure(page-1);
    }
  }

  getAllExpenditure(page : number){
    this.expenditureService.getPaginator(page).subscribe(
      result => {
        this.expenditures = result.list,
        this.col_size = result.totalRecords
      },
      error => console.log(error)
    ); 
  }

  openEliminar(expenditureId: number, name: string, descp: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea eliminar el Gasto : " + name + " " + descp + "?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.result.then(() => {
      this.expenditureService.deleteExpenditure(expenditureId).subscribe(
        data => {
            this.getAllExpenditure(this.page);
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
