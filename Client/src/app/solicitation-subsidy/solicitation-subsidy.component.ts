import { AllSolicitationSubsidyDto } from './../_models/solicitationSubsidy';
import { TransportService } from 'src/app/_services/transport.service';
import { SolicitationSubsidyService } from './../_services/solicitation-subsidy.service';
import { Component, OnInit } from '@angular/core';
import { SolicitationSubsidyBaseDto } from '../_models/solicitationSubsidy';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-solicitation-subsidy',
  templateUrl: './solicitation-subsidy.component.html',
  styleUrls: ['./solicitation-subsidy.component.css']
})
export class SolicitationSubsidyComponent implements OnInit {

  filters = {
    page : 0,
    userName : ""
  }

   //paginator
   col_size : number;
   page = 0;
   itemsPerPage : number = 10;
   //
   solicitationSubsidies : AllSolicitationSubsidyDto[];
   error = '';
   transports : any;

  constructor(
    private solicitationSubsidy : SolicitationSubsidyService,
    private transportService : TransportService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll(this.filters);
    this.getAllTransport();
    
  }

  getAll(filters : any){
    this.solicitationSubsidy.getAllSolicitationSubsidies(filters).subscribe(
      x => {
          this.solicitationSubsidies = x.list;
          this.col_size = x.totalRecords;
        }
    );
  }

  getAllTransport(){
    this.transportService.getAll().subscribe(
      x => this.transports = x.response
    );
  }
  
  filter(){
    this.getAll(this.filters);
  }

    //MODALS
    openEliminar(solicitud : SolicitationSubsidyBaseDto) {
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.Encabezado = "Eliminar";
      modalRef.componentInstance.Contenido = "¿Desea eliminar el transporte : " + solicitud.motive + "?";
      modalRef.componentInstance.GuardaroEliminar = "Eliminar";
      modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
      modalRef.componentInstance.MsgClose = "Cancelar";
      modalRef.result.then(() => {
        this.solicitationSubsidy.delete(solicitud.id).subscribe(
          data => {
            this.getAll(this.filters);
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
