import { SolicitationSubsidyService } from './../../_services/solicitation-subsidy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from './../../_services/notifications.service';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notifications } from '../../_models/notifications';
import { NgbdModalContent } from '../modals.component';
import { SolicitationSubsidydetailComponent } from 'src/app/solicitation-subsidy/detail/solicitation-subsidydetail.component';
import { GenericsCommunicationsComponentsService } from 'src/app/_services/generics-communications-components.service';
import { SupervisorUserAgentService } from 'src/app/_services/supervisor-user-agent.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.css']
})
export class ListNotificationsComponent {

  Contenido: Notifications[];
  @Input() Encabezado;
  @Input() button;
  @Input() ButtonHidden;
  col_size: number;
  itemsPerPage: number = 5;
  page = 0;
  verOcultar: string = 'angle-down';
  notificationRidden = new Notifications();
  colapseOrNo: boolean;
  public isCollapsed = true;

  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private comunicationService : GenericsCommunicationsComponentsService,
    private supervisorUserAgentService : SupervisorUserAgentService,
    private notificationServices : NotificationsService,
    private solicitationSubsidyService : SolicitationSubsidyService,
    private router : Router) { }

  ngOnInit() {
    this.getAllNotifications(this.page);
  }

  loadPage(page: number) {
    if (page != 0) {
      this.getAllNotifications(page - 1);
    }
  }

  getAllNotifications(page: number): void {
    this.notificationServices.getPaginator(page).subscribe(result => {
        this.Contenido = result.list;
        this.col_size = result.totalRecords;
        this.comunicationService.sendMessage(true);
    }
    )
  }

  retriveNotifications(){
    this.notificationServices.getAllNotifications().subscribe(
      x => {
            this.Contenido = x;
            this.col_size = this.Contenido.length;
      }, () => {
        console.log('');
      }
      );
   }

  seeThisNotification(notificationridden : any) {
    this.supervisorUserAgentService.isAgent(notificationridden.creatorUserId)
    .subscribe(user => {
        if (user){
          this.notificationServices.notificationRidden(notificationridden).subscribe(
            () =>{
              this.retriveNotifications();
                const modalRef = this.modalService.open(SolicitationSubsidydetailComponent, {size : "lg"});
                modalRef.componentInstance.idModal = notificationridden.solicitationSubsidyId;
                modalRef.result.then(() => {    },
                () => {
                    console.log('Backdrop click');
                })
              } 
          )
        }else{
          this.solicitationSubsidyService.wichStateSolicitation(notificationridden.solicitationSubsidyId)
          .subscribe(solicitationState => {
            if (solicitationState.description == 'Rechazado'){
              //significa que es mi supervisor y la nootificación es para mi
              this.notificationServices.notificationRidden(notificationridden).subscribe(
                () =>{
                    this.retriveNotifications();
                    const modalRef = this.modalService.open(NgbdModalContent, {size : "lg"});
                    modalRef.componentInstance.Contenido = "Rechazado";
                    modalRef.componentInstance.Encabezado = "Motivo de Rechazo";
                    modalRef.componentInstance.MsgClose = "Cerrar";
                    modalRef.componentInstance.GuardaroEliminarHidden = true;
                    modalRef.componentInstance.MsgCloseClass = "btn-primary";
                    this.router.navigate(['SolicitationSubsidy/agent']);
                    modalRef.result.then(() => {    },
                    () => {
                        console.log('Backdrop click');
                    })
                  } 
              )
            }

            if(solicitationState.description == 'Aceptado'){
              this.notificationServices.notificationRidden(notificationridden).subscribe(
                () =>{
                    this.retriveNotifications();
                    this.router.navigateByUrl('print/'+notificationridden.solicitationSubsidyId);
                  } 
              )
            }
            
          });

        }
    });
  }

  delete(id : number){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea Eliminar?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.componentInstance.MsgCloseClass = "btn-default"
    modalRef.result.then(() => {
          this.notificationServices.delete(id).subscribe(
            ()=>{
              this.getAllNotifications(this.page)
            }
            ,
            error => {
                console.log("error", error);
            }
          );
          },
          () => {
            console.log('Backdrop click');
          })
  }

  ocultar(event: boolean) {
    this.isCollapsed = event;
  }

  mostrar(event: boolean) {
    this.isCollapsed = !event
  }

  onChange(notification: any) {
    console.log(notification);
    //this.isCollapsed = !this.isCollapsed;

    if (this.verOcultar == 'angle-down') {
      this.verOcultar = 'angle-up';
    } else {
      this.verOcultar = 'angle-down';
    }

    //si no esta leido que vaya a la base de datos y actualize
    //colapsable abierto
    if (notification.read == false) {

      this.notificationServices.notificationRidden(notification).subscribe(
        //x => this.getAllNotifications(this.page),
        () => {
            notification.colapse = !notification.colapse,
            notification.read = !notification.colapse;
        },
        error => {
          console.log("error", error);
        }
      );
    } else {
      //cerramos el colapsable
      notification.colapse = !notification.colapse;
    }
  }
}
