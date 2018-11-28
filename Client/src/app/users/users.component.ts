import { DistributionBaseDto } from 'src/app/_models/distributions';
import { Roles, RoleUserDto } from './../_models/roles';
import { NgbdModalContent } from './../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from './users';
import { DistributionService } from '../_services/distribution.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  // page = 0;
  filters = { page: 0 }
  user_list: User[];
  filter: User[];
  roles_list: Roles;
  col_size: number;
  itemsPerPage: number = 10;
  value: number;
  distributions: DistributionBaseDto[];
  displayedColumns = ['dni', 'userName'];
  changeRolDto = new RoleUserDto();

  constructor(private var_user_service: UserService, private modalService: NgbModal,
    private distributionService: DistributionService) { }

  ngOnInit() {
    this.getAllUsers(this.filters);
    this.distributionService.allDistribution().subscribe(
      x => {
        this.distributions = x;
      }
    );
  }

  loadPage(page: number) {
    if (this.filters.page > 0) {
      this.filters.page = this.filters.page - 1;
      this.getAllUsers(this.filters);
    }
  }

  filterList() {
    this.getAllUsers(this.filters);
  }

  getAllUsers(filters: any): void {
    this.var_user_service.getPaginator(filters).subscribe(result => {
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
          this.getAllUsers(this.filters);
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

  findUsers(distributionId: number) {
  }



}
