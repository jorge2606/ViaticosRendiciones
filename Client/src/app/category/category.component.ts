import { Title } from '@angular/platform-browser';
import { CategoryService } from './../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  filters = { page: 0, name: "" }
  //paginator
  col_size : number;
  page = 0;
  itemsPerPage : number = 10;
  //
  categories : any[];
  error : any;
  category_list_length: number;
  textListEmpty : string = "No se encontró ningúna categoría";
  classListEmpty : string = "alert-primary";

  constructor(
            private categoryService : CategoryService,
            private modalService: NgbModal,
            private titleService : Title,
            private toastrService : ToastrService
            ) { 
              this.titleService.setTitle('Categorías');
            }

  ngOnInit() {
    this.getAllCategories(this.filters); 
  }

  loadPage(page : number){
    if (page > 0){
      this.filters.page = page - 1;
      this.getAllCategories(this.filters);
    }
  }

  getAllCategories(filters : any){
    this.categoryService.getPaginator(filters).subscribe(
      result => {
        this.categories = result.list,
        this.category_list_length = this.categories.length,
        this.col_size = result.totalRecords
      },
      error => console.log(error)
    ); 
  }

  //MODALS
  openEliminar(idCategory: number, name: string, descp: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea eliminar la Categoría : " + name + " " + descp + "?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.result.then(() => {
      this.categoryService.deleteCategory(idCategory).subscribe(
        data => {
          this.toastrService.success("La categoría '"+name+"' se ha eliminado correctamente.",'',
          {positionClass : 'toast-top-center', timeOut : 3000});
          this.getAllCategories(this.filters);
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
    this.getAllCategories(this.filters);
  }

}
