import { CategoryService } from './../_services/category.service';
import { Category, AllCategoryDto } from './../_models/category';
import { Component, OnInit } from '@angular/core';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //paginator
  col_size : number;
  page = 0;
  itemsPerPage : number = 10;
  //
  categories : any[];
  error : any;
  constructor(private categoryService : CategoryService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllUsers(this.page); 
  }

  loadPage(page : number){
    if (page != 0){
      this.getAllUsers(page-1);
    }
  }

  getAllUsers(page : number){
    this.categoryService.getPaginator(page).subscribe(
      result => {
        this.categories = result.list,
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
            this.getAllUsers(this.page);
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
