import { CreateTransportDto } from './../_models/transport';
import { TransportService } from './../_services/transport.service';
import { Component, OnInit } from '@angular/core';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.css']
})
export class TransportsComponent implements OnInit {

  page = 0;
  transport : CreateTransportDto[];
  col_size : number;
  itemsPerPage : number = 10;

  constructor(
          private transportService : TransportService, 
          private modalService: NgbModal,
          private titleService : Title,
          private toastrService : ToastrService
          ) { }

  ngOnInit() {
    this.titleService.setTitle('Transporte');
    this.getAllTransports(this.page); 
  }

  getAllTransports(page : number){
    this.transportService.getPaginator(page).subscribe(
      result => {
        this.transport = result.list,
        this.col_size = result.totalRecords
      },
      error => console.log(error)
    ); 

  }

  loadPage(page : number){
    if (page != 0){
      this.getAllTransports(page-1);
    }
  }

    //MODALS
    openEliminar(id: number, name: string, descp: string) {
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.Encabezado = "Eliminar";
      modalRef.componentInstance.Contenido = "¿Desea eliminar el transporte : " + name + " " + descp + "?";
      modalRef.componentInstance.GuardaroEliminar = "Eliminar";
      modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
      modalRef.componentInstance.MsgClose = "Cancelar";
      modalRef.result.then(() => {
        this.transportService.deleteTransport(id).subscribe(
          data => {
              this.toastrService.success("El transporte '"+name+"' se ha eliminado correctamente.",'',
              {positionClass : 'toast-top-center', timeOut : 3000});
              this.getAllTransports(this.page);
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
