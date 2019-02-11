import { SolicitationSubsidyService } from './../_services/solicitation-subsidy.service';
import { SupervisorUserAgentService } from 'src/app/_services/supervisor-user-agent.service';
import { SelectorDirective } from './../directives/selector.directive';
import { AuthenticationService } from './../_services/authentication.service';
import { Observable } from 'rxjs';
import { Notifications } from './../_models/notifications';
import { NotificationsService } from './../_services/notifications.service';
import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MessBetweenCompService } from '../_services/mess-between-comp.service';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListNotificationsComponent } from '../modals/list-notifications/list-notifications.component';
import { NotifyRejectComponent } from '../modals/notify-reject/notify-reject.component';
import { SolicitationSubsidydetailComponent } from '../solicitation-subsidy/detail/solicitation-subsidydetail.component';
import { Router } from '@angular/router';
import { GenericsCommunicationsComponentsService } from '../_services/generics-communications-components.service';

@Component({
  selector: 'app-navar',
  templateUrl: './navar.component.html',
  styleUrls: ['./navar.component.css']
})
export class NavarComponent implements OnInit {

  constructor(private notificaionServices : NotificationsService, 
              private authService : AuthenticationService,
              private messaBetweenComp : MessBetweenCompService,
              private modalService: NgbModal,
              private supervisorUserAgentService : SupervisorUserAgentService,
              private comunicationService : GenericsCommunicationsComponentsService,
              private solicitationSubsidyService : SolicitationSubsidyService,
              private router : Router) { }

  notification : Notifications[] = [];
  isLogged : Observable<boolean>;
  idUser : number;
  cantNotif : number = 0;
  @Input() urlImage : string;
  userName : string;
  firstName : string;
  lastName : string;


  retriveNotifications(){
    this.notificaionServices.getAllNotifications().subscribe(
      x => {
            this.notification = x;
            this.cantNotif = this.notification.length;
            this.idUser = this.authService.userId('id');
            this.userName = this.authService.userId('userName');
            this.firstName = this.authService.userId('firstName');
            this.lastName = this.authService.userId('lastName');
      }, () => {
        console.log('');
      }
      );
   }

  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn;
    this.comunicationService.getMessage()
    .subscribe(x => {
        this.retriveNotifications();
    });
    this.isLogged.subscribe(x => {
      if(x){
        this.retriveNotifications();
      }  
    })

    this.messaBetweenComp.getMessage().subscribe( 
      () => this.urlImage = this.authService.urlFile(this.idUser, 25, 25) + "r=" + (Math.random() * 100) + 1 
    );
    
    if (!this.urlImage){
      this.urlImage = this.authService.urlFile(this.idUser, 25,25)+ "r=" + (Math.random() * 100) + 1;
    }
    
  }
  logout(){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Cerrar Sesión";
    modalRef.componentInstance.Contenido = "¿Desea salir de la aplicación?";
    modalRef.componentInstance.GuardaroEliminar = "Salir";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-primary";
    modalRef.componentInstance.MsgCloseClass = "btn-default";
    modalRef.result.then(() => {    
      this.authService.logout();
    },
    () => {
      console.log('Backdrop click');
    })
  }

  //MODALS
  /** seeThisNotification(notificationridden : any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Notificación";
    modalRef.componentInstance.Contenido = notificationridden.textData;
    modalRef.componentInstance.MsgClose = "Cerrar";
    modalRef.componentInstance.MsgCloseClass = "btn-primary";
    modalRef.componentInstance.GuardaroEliminarHidden = true;
    
    this.notificaionServices.notificationRidden(notificationridden).subscribe(
        () => this.retriveNotifications()
    )

  }*/

  seeThisNotification(notificationridden : any) {
      this.supervisorUserAgentService.isAgent(notificationridden.creatorUserId)
      .subscribe(user => {
          if (user){
            this.notificaionServices.notificationRidden(notificationridden).subscribe(
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
                this.notificaionServices.notificationRidden(notificationridden).subscribe(
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
                this.notificaionServices.notificationRidden(notificationridden).subscribe(
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

  seeAllNotification() {
    const modalRef = this.modalService.open(ListNotificationsComponent);
    modalRef.componentInstance.Encabezado = "Todas las Notificaciones";
    modalRef.componentInstance.button = "Entendido";
    modalRef.componentInstance.ButtonHidden = false;
    modalRef.result.then(() => {
      /*this.notificationridden.id = id,
      this.notificationridden.read = true,
      this.notificationridden.textData = "";
      this.notificationridden.tittle = "" 
      this.notificaionServices.notificationRidden(this.notificationridden).subscribe(
        x => this.notificaionServices.getAllNotifications().subscribe(
          x => console.log(x)
          
        )
      )*/
    },
      () => {
        console.log('Backdrop click');
    })
  }
  

  delete(id : number){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea Eliminar?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.componentInstance.MsgCloseClass = "btn-default";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
    modalRef.result.then(() => {
          this.notificaionServices.delete(id).subscribe(
            ()=>{
              
            }
            ,
            error => {
                console.log("error", error);
            }
          );
    })
  }

}
