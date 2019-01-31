import { Component, OnInit } from '@angular/core';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { TransportService } from 'src/app/_services/transport.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SolicitationSubsidyBaseDto, SolicitationIdDto, AllSolicitationSubsidyDto } from 'src/app/_models/solicitationSubsidy';
import { NgbdModalContent } from 'src/app/modals/modals.component';
import { SolicitationSubsidydetailComponent } from '../detail/solicitation-subsidydetail.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  filters = {
    page : 0,
    userName : ""
  }

   //paginator
   col_size : number;
   page = 0;
   itemsPerPage : number = 1;
   //
   solicitationSubsidies : AllSolicitationSubsidyDto[];
   error = '';
   transports : any;
  constructor(
    private solicitationSubsidyservice : SolicitationSubsidyService,
    private transportService : TransportService,
    private modalService: NgbModal,
    private router : Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAll(this.filters);
    this.getAllTransport();
    
  }

  loadPage(page : any) {
    if (page > 0) {
      this.filters.page = page;
      this.getAll(this.filters);
    }
  }
  
  getAll(filters : any){
    this.solicitationSubsidyservice.getAllSolicitationSubsidiesAgent(filters).subscribe(
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
      this.spinner.show();
      this.solicitationSubsidyservice.sendSolicitationByEmail(newSolicitation)
      .subscribe(
        x => {
            this.spinner.hide();
            this.getAll(this.filters);
          }
        ,
        error =>{
          console.log(error);
          this.spinner.hide();
          this.getAll(this.filters);
        }
      );
    } 

}
