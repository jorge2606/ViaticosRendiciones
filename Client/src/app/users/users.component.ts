import { Roles, RoleUserDto } from './../_models/roles';
import { NgbdModalContent } from './../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from './users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  page = 0;
  user_list: User[];
  roles_list : Roles;
  col_size : number;
  itemsPerPage : number = 10;
  value : number;

  displayedColumns = ['dni','userName'];

  changeRolDto = new RoleUserDto();
  
  constructor(private var_user_service: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllUsers(this.page);
  }

  loadPage(page : number){
  if (page != 0){
    this.getAllUsers(page-1);
  }
     
  }
  getAllUsers(page : number): void {
    this.var_user_service.getPaginator(page).subscribe(result => {
      this.user_list = result.list
      this.col_size = result.totalRecords
      
  });
 
  }
  //MODALS
  openEliminar(id: number, dni: number, usuario: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea eliminar a " + dni + " " + usuario + "?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.result.then(() => {
      this.var_user_service.deleteUser(id).subscribe(
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
