import { Title } from '@angular/platform-browser';
import { CreateOrganismDto } from './../_models/organism';
import { Component, OnInit } from '@angular/core';
import { OrganismService } from '../_services/organism.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../modals/modals.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.component.html',
  styleUrls: ['./organisms.component.css']
})
export class OrganismsComponent implements OnInit {

  filters = { page: 0, name : ""} 
  organism : CreateOrganismDto[];
  col_size : number;
  itemsPerPage : number = 10;
  textListEmpty : string = "No se encontró ningún organismo";
  classListEmpty : string = "alert-primary";

  constructor(
              private organismService : OrganismService,
              private modalService : NgbModal,
              private titleService : Title,
              private toastrService : ToastrService
              ) { 
                this.titleService.setTitle('Organismos');
              }

  ngOnInit() {
    this.getAllOrganism(this.filters); 
  }

  getAllOrganism(page : any){
    this.organismService.getPaginator(this.filters).subscribe(
      result => {
        this.organism = result.list,
        this.col_size = result.totalRecords
      },
      error => console.log(error)
    ); 
  }

  loadPage(page : number){
    if (page != 0){
      this.filters.page = page - 1;
      this.getAllOrganism(this.filters);
    }
    
  }

  openEliminar(id: number, name: string, descp: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea eliminar el Organismo : " + name + " " + descp + "?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.result.then(() => {
      this.organismService.deleteOrganism(id).subscribe(
        data => {
            this.toastrService.success("El organismo '"+name+"' se ha eliminado correctamente.",'',
            {positionClass : 'toast-top-center', timeOut : 3000});
            this.getAllOrganism(this.filters.page);
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

  findWhileWrite(){
    this.getAllOrganism(this.filters);
  }

}
