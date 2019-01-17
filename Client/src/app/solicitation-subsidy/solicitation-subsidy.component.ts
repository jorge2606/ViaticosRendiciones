import { AllSolicitationSubsidyDto, SolicitationIdDto } from './../_models/solicitationSubsidy';
import { TransportService } from 'src/app/_services/transport.service';
import { SolicitationSubsidyService } from './../_services/solicitation-subsidy.service';
import { Component, OnInit } from '@angular/core';
import { SolicitationSubsidyBaseDto } from '../_models/solicitationSubsidy';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SolicitationSubsidydetailComponent } from './detail/solicitation-subsidydetail.component';

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
    private solicitationSubsidyservice : SolicitationSubsidyService,
    private transportService : TransportService,
    private modalService: NgbModal,
    private router : Router) { }

  ngOnInit() {
    this.getAll(this.filters);
    this.getAllTransport();
    
  }

  getAll(filters : any){
    this.solicitationSubsidyservice.getAllSolicitationSubsidies(filters).subscribe(
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
        this.solicitationSubsidyservice.delete(solicitud.id).subscribe(
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

    openDetail(id : number){
      const modalRef = this.modalService.open(SolicitationSubsidydetailComponent, {size : "lg"});
      modalRef.componentInstance.idModal = id;
      modalRef.result.then(() => {
        this.getAll(this.filters);
      },
        () => {
          console.log('Backdrop click');
      })
    }

    openMotiveReject(motiveReject : string){
      const modalRef = this.modalService.open(NgbdModalContent, {size : "lg"});
      modalRef.componentInstance.Contenido = motiveReject;
      modalRef.componentInstance.Encabezado = "Motivo de Rechazo";
      modalRef.componentInstance.MsgClose = "Cerrar";
      modalRef.componentInstance.GuardaroEliminarHidden = true;
      modalRef.componentInstance.MsgCloseClass = "btn-primary";
      modalRef.result.then(() => {
        this.getAll(this.filters);
      },
        () => {
          console.log('Backdrop click');
      })
    }

    sendToSupervisor(id : number){
      let newSolicitation = new SolicitationIdDto();
      newSolicitation.id = id;
      this.solicitationSubsidyservice.sendSolicitationByEmail(newSolicitation)
      .subscribe(
        x => {console.log(x)}
        ,
        error =>{
          console.log(error);
        }
      );
    }
}
