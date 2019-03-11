import { AuthenticationService } from './../_services/authentication.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { DistributionService } from '../_services/distribution.service';
import { DistributionBaseDto } from '../_models/distributions';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganismBaseDto } from '../_models/organism';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganismService } from '../_services/organism.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-distributions',
  templateUrl: './distributions.component.html',
  styleUrls: ['./distributions.component.css']
})
export class DistributionsComponent implements OnInit {

  organisms : any[];
  filters = { page: 0, name : "", organismId: "" }
  //paginator
  col_size : number;
  page = 0;
  itemsPerPage : number = 10;
  //
  distribution : DistributionBaseDto[];
  user_list_length: number;
  textListEmpty : string = "No se encontró ningúna repartición.";
  classListEmpty : string = "alert-primary";
  permissions : any[] = [];
  distributionCreate: any;
  distributionEdit: any;
  distributionDelete: any;
  
  constructor(
              private distributionService : DistributionService,
              private modalService: NgbModal,
              private organismService : OrganismService,
              private authService : AuthenticationService,
              private route: ActivatedRoute,
              private titleService : Title,
              private toastrService : ToastrService) { 
                this.titleService.setTitle('Reparticiones');
              }

  ngOnInit() {
    this.route.params.subscribe(
      p => { if (p.organismId){ this.filters.organismId = p.organismId; } }
    );
    
    this.organismService.getAllOrganism().subscribe(
      x =>{
          this.organisms = x;
          this.getAllDistributions(this.filters);
          this.permissions = this.authService.userId('roles');
          this.distributionCreate = this.permissions.find(x => x.value == 'distributions.create');
          this.distributionEdit = this.permissions.find(x => x.value == 'distributions.edit');
          this.distributionDelete = this.permissions.find(x => x.value == 'distributions.delete');

      } 
    );
    
  }

  getAllDistributions(filters : any){
    this.distributionService.getPaginator(filters).subscribe(
      result => {
        this.distribution = result.list;
        this.col_size = result.totalRecords;
      },
      error => console.log(error)
    ); 

  }

  loadPage(page : any){
    if (page > 0){
      this.filters.page = page - 1;
      this.getAllDistributions(this.filters);
    }
  }

  //MODALS
  openEliminar(distributionId: number, name: string, descp: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea eliminar la distribución : " + name + " " + descp + "?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.result.then(() => {
      this.distributionService.deleteDistribution(distributionId).subscribe(
        () => {
          this.toastrService.success("La repartición '"+name+"' se ha eliminado correctamente.",'',
          {positionClass : 'toast-top-center', timeOut : 3000});
          this.getAllDistributions(this.filters);
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

  seeOrganism(org : OrganismBaseDto){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = org.name;
    modalRef.componentInstance.Contenido = org.name+" "+ org.description;
    modalRef.componentInstance.GuardaroEliminarHidden = true;
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.result.then(() => {
    },
      () => {
        console.log('Backdrop click');
    })

  }

  findWhileWrite(){
    this.getAllDistributions(this.filters);
  }

  filterList(){
    this.getAllDistributions(this.filters);
  }

}
