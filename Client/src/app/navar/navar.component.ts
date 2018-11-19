import { AuthenticationService } from './../_services/authentication.service';
import { Observable } from 'rxjs';
import { Notifications } from './../_models/notifications';
import { NotificationsService } from './../_services/notifications.service';
import { Component, OnInit, Input } from '@angular/core';
import { MessBetweenCompService } from '../_services/mess-between-comp.service';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import { ListNotificationsComponent } from '../modals/list-notifications/list-notifications.component';

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
              private var_user_service: UserService ) { }

  notification : Notifications[];
  isLogged : Observable<boolean>;
  idUser : number;
  cantNotif : number = 0;
  @Input() urlImage : string;


  retriveNotifications(){
    this.notificaionServices.getAllNotifications().subscribe(
      x => {
      this.notification = x,
      this.cantNotif = this.notification.length
      }, error =>{
        console.log('')
      }
      );
  }

  ngOnInit() {

    this.retriveNotifications();
    
    this.idUser = this.authService.userId('id');
    
    this.isLogged = this.authService.isLoggedIn;
    
    this.messaBetweenComp.getMessage().subscribe( x=> 
      this.urlImage = this.authService.urlFile(this.idUser, 25,25)+ "r=" + (Math.random() * 100) + 1 );
    
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
  seeThisNotification(notificationridden : any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Notificación";
    modalRef.componentInstance.Contenido = notificationridden.textData;
    modalRef.componentInstance.MsgClose = "Cerrar";
    modalRef.componentInstance.MsgCloseClass = "btn-primary";
    modalRef.componentInstance.GuardaroEliminarHidden = true;
    
    this.notificaionServices.notificationRidden(notificationridden).subscribe(
        x => this.retriveNotifications()
    )

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
