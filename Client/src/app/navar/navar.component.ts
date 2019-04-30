import { SolicitationSubsidyBaseDto } from 'src/app/_models/solicitationSubsidy';
import { SolicitationSubsidyService } from './../_services/solicitation-subsidy.service';
import { SupervisorUserAgentService } from 'src/app/_services/supervisor-user-agent.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Observable } from 'rxjs';
import { Notifications } from './../_models/notifications';
import { NotificationsService } from './../_services/notifications.service';
import { Component, OnInit, Input, Renderer } from '@angular/core';
import { MessBetweenCompService } from '../_services/mess-between-comp.service';
import { NgbdModalContent } from '../modals/modals.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ListNotificationsComponent } from '../modals/list-notifications/list-notifications.component';
import { SolicitationSubsidydetailComponent } from '../solicitation-subsidy/detail/solicitation-subsidydetail.component';
import { Router } from '@angular/router';
import { GenericsCommunicationsComponentsService } from '../_services/generics-communications-components.service';
import { DetailAccountForSolicitationComponent } from '../solicitation-subsidy/detail-account-for-solicitation/detail-account-for-solicitation.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navar',
  templateUrl: './navar.component.html',
  styleUrls: ['./navar.component.css']
})
export class NavarComponent implements OnInit {
  
  notification : Notifications[] = [];
  isLogged : Observable<boolean>;
  idUser : number;
  cantNotif : number = 0;
  @Input() urlImage : string;
  userName : string;
  firstName : string;
  lastName : string;
  isloggedUser : boolean;
  solicitationSubsidy : SolicitationSubsidyBaseDto;
  isRefund = {'yes' : true, 'not' : false};
  roles : any [] = [];
  rolesNames : any[] = []
  showTabSolicitation : any;
  showTabUsers : any;
  showTabRoles : any;
  showTabCategories : any;
  showTabDistribution : any;
  showTabTransports : any;
  showTabExpenditures : any;
  showTabOrganism : any;
  showTabHolidays : any;
  createSolicitation: any;
  createRefund: any;
  moderateSolicitation: any;
  moderateRefund: any;
  moderateViewRefund: any;
  moderateViewSolicitation: any;
  show : boolean = true;
  showTabAudits: any;
  currentYear : number;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };

  constructor(private notificationServices : NotificationsService, 
              private authService : AuthenticationService,
              private messaBetweenComp : MessBetweenCompService,
              private modalService: NgbModal,
              private supervisorUserAgentService : SupervisorUserAgentService,
              private comunicationService : GenericsCommunicationsComponentsService,
              private solicitationSubsidyService : SolicitationSubsidyService,
              private router : Router,
              private toastrService : ToastrService) { }


  retriveNotifications(){
    this.notificationServices.getAllNotifications().subscribe(
      x => {
            this.notification = x;
            this.cantNotif = this.notification.length;
            this.idUser = this.authService.userId('id');
            this.userName = this.authService.userId('userName');
            this.firstName = this.authService.userId('firstName');
            this.lastName = this.authService.userId('lastName');
      },err=>{
        console.log(err);
      }
      );
   }

  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn;

    this.isLogged.subscribe(x => {
      this.isloggedUser = x;
      //si el usuario esta logueado
      if(x){
        this.currentYear = new Date().getFullYear();
        this.rolesNames = this.authService.userId('rolesNames');
        this.roles = this.authService.userId('roles');
        this.showTabSolicitation = this.roles.find(
          claims => claims.value == 'solicitations.viewSolicitation' 
          || claims.value == 'solicitations.create'
          || claims.value == 'solicitations.createRefund'
          || claims.value == 'solicitations.moderateSolicitations'
          || claims.value == 'solicitations.moderateRefunds'
          || claims.value == 'solicitations.viewRefund'
          || claims.value == 'solicitations.viewSolicitation');

        this.createSolicitation = this.roles.find(x => x.value == 'solicitations.create');
        this.createRefund = this.roles.find(x => x.value == 'solicitations.createRefund');
        this.moderateSolicitation = this.roles.find(x => x.value == 'solicitations.moderateSolicitations');
        this.moderateRefund = this.roles.find(x => x.value == 'solicitations.moderateRefunds');
        this.moderateViewRefund = this.roles.find(x => x.value == 'solicitations.moderateRefunds');
        this.moderateViewSolicitation = this.roles.find(x => x.value == 'solicitations.viewSolicitation');

        this.showTabUsers = this.roles.find(x => x.value == 'user.view');
        this.showTabCategories = this.roles.find(x => x.value == 'categories.view');
        this.showTabDistribution = this.roles.find(x => x.value == 'distributions.view');
        this.showTabExpenditures = this.roles.find(x => x.value == 'expenditures.view');
        this.showTabOrganism = this.roles.find(x => x.value == 'organisms.view');
        this.showTabRoles = this.roles.find(x => x.value == 'roles.view');
        this.showTabHolidays = this.roles.find(x => x.value == 'holidays.view');
        this.showTabTransports = this.roles.find(x => x.value == 'transports.view');
        this.showTabAudits = this.roles.find(x => x.value == 'audits.view');

        this.comunicationService.getMessage()
        .subscribe(() => {
            this.retriveNotifications();
        });

        this.messaBetweenComp.getMessage().subscribe( 
          () => this.urlImage = this.authService.urlFile(this.idUser, 60, 37) + "r=" + (Math.random() * 100) + 1 
        );
        
        if (!this.urlImage){
          this.urlImage = this.authService.urlFile(this.idUser, 60,37)+ "r=" + (Math.random() * 100) + 1;
        }
        this.retriveNotifications();
      }
    })    
  }

  
  logout(){
    const modalRef = this.modalService.open(NgbdModalContent,{
      backdrop : 'static',
      keyboard : false
    });
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

  seeThisNotification(notificationridden : any) {
      this.modalService.dismissAll();
      this.supervisorUserAgentService.isAgent(notificationridden.creatorUserId)
      .subscribe(user => {
          if (user){//si es verdadero entonces este mensaje es de uno de mis agentes
            this.solicitationSubsidyService.getBySolicitationIdWhitState(notificationridden.solicitationSubsidyId)
            .subscribe(
              solicitation => {
                  if (!solicitation.finalizeDate){//si no es una rendición
                      this.notificationServices.notificationRidden(notificationridden).subscribe(
                        () =>{
                            this.retriveNotifications();
                            const modalRef = this.modalService.open(SolicitationSubsidydetailComponent, {
                              backdrop : 'static',
                              keyboard : false,
                              size : "lg"});
                            modalRef.componentInstance.idModal = notificationridden.solicitationSubsidyId;
                            modalRef.result.then(() => { 
                              console.log(this.router.url);
                              this.router.navigate([this.router.url])
                            },
                            () => {
                                console.log('Backdrop click');
                            })
                          } 
                      );
                  }else{
                    this.notificationServices.notificationRidden(notificationridden).subscribe(
                      () =>{
                            this.retriveNotifications();
                            const modalRef = this.modalService.open(DetailAccountForSolicitationComponent, {
                              backdrop : 'static',
                              keyboard : false,
                              size : "lg"});
                            modalRef.componentInstance.idModal = notificationridden.solicitationSubsidyId;
                            modalRef.result.then(() => { 
                              this.router.navigate([this.router.url])
                            },
                            () => {
                                console.log('Backdrop click');
                            });      
                        } 
                    );
                  }
              }
            );

          }else{
            this.solicitationSubsidyService.wichStateSolicitation(notificationridden.solicitationSubsidyId)
            .subscribe(solicitationState => {
              if (solicitationState.description == 'Rechazado'){
                //significa que es mi supervisor y la nootificación es para mi
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                  () =>{
                      this.retriveNotifications();
                      const modalRef = this.modalService.open(NgbdModalContent, {
                        backdrop : 'static',
                        keyboard : false,
                        size : "lg"
                      });
                      modalRef.componentInstance.Contenido = solicitationState.motiveReject;
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
              if (solicitationState.description === 'Rendido'){
                this.notificationServices.notificationRidden(notificationridden)
                .subscribe(
                  () =>{
                      this.retriveNotifications();
                  });
              }

              if (solicitationState.description === 'Rendición Rechazada'){
                this.retriveNotifications();
                this.router.navigateByUrl('SolicitationSubsidy/agent/accountFor/'+notificationridden.solicitationSubsidyId);
              }
              //si soy propietario de la solicitud
              if(solicitationState.description == 'Aceptado' && solicitationState.userId == this.authService.userId('id') ){
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                  () =>{
                      this.retriveNotifications();
                      if (!solicitationState.isRefund){
                        this.router.navigateByUrl('SolicitationSubsidy/agent/print/'+notificationridden.solicitationSubsidyId);
                      }else{
                        this.router.navigateByUrl('SolicitationSubsidy/agent/printAccountFor/'+notificationridden.solicitationSubsidyId);
                      }
                      
                    } 
                )
              }else if (solicitationState.description == 'Aceptado' && solicitationState.userId != this.authService.userId('id'))
              {
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                  () =>{
                      this.retriveNotifications();
                      if (!solicitationState.isRefund){
                        this.toastrService.info('Este Reintegro ya fue aprobado');  
                      }else{
                        this.toastrService.info('Esta solicitud ya fue aprobada');
                      }
                      
                    } 
                )
              }

              if(solicitationState.description == 'Rendición Aceptada' && solicitationState.userId == this.authService.userId('id')){
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                  () =>{
                      this.retriveNotifications();
                      this.router.navigateByUrl('SolicitationSubsidy/agent/printAccountFor/'+notificationridden.solicitationSubsidyId);
                    } 
                )
              }else if (solicitationState.description == 'Rendición Aceptada' && solicitationState.userId != this.authService.userId('id'))
              {
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                  () =>{
                      this.retriveNotifications();
                      this.toastrService.info('Esta rendición de solicitud ya fue aprobada');
                    } 
                )
              }

              if(solicitationState.description == 'Aprobado 1ra. Instancia' 
                  && this.authService.userId('id') != solicitationState.userId){
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                  () =>{
                      this.retriveNotifications();
                      this.router.navigateByUrl('/SolicitationSubsidy/agent/supervisor/solicitationSubsidies/'+solicitationState.isRefund);
                    } 
                )
              }else if(solicitationState.description == 'Aprobado 1ra. Instancia'
                && this.authService.userId('id') == solicitationState.userId){
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                  () =>{
                      this.retriveNotifications();
                      } 
                )
              }

              if(solicitationState.description == 'Rendición Aprobada 1ra. Instancia' 
                && this.authService.userId('id') == solicitationState.userId){
                this.notificationServices.notificationRidden(notificationridden).subscribe(
                () =>{
                    this.retriveNotifications();
                  } 
                )
              }else if (solicitationState.description == 'Rendición Aprobada 1ra. Instancia' 
                && this.authService.userId('id') != solicitationState.userId){
                  this.notificationServices.notificationRidden(notificationridden).subscribe(
                    () =>{
                      this.retriveNotifications();
                      this.router.navigateByUrl('/SolicitationSubsidy/agent/supervisor/solicitationSubsidies/'+solicitationState.isRefund)
                  }) 
              }
              
            });

          }
      });

  }

  seeAllNotification() {
    const modalRef = this.modalService.open(ListNotificationsComponent,this.ngbModalOptions);
    modalRef.componentInstance.Encabezado = "Todas las Notificaciones";
    modalRef.componentInstance.button = "Entendido";
    modalRef.componentInstance.ButtonHidden = false;
    modalRef.result.then(() => {
    },
      () => {
        console.log('Backdrop click');
    })
  }
  

  delete(id : number){
    const modalRef = this.modalService.open(NgbdModalContent,{
      backdrop : 'static',
      keyboard : false
    });
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea Eliminar?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.componentInstance.MsgCloseClass = "btn-default";
    modalRef.componentInstance.GuardaroEliminarClass = "btn-danger";
    modalRef.result.then(() => {
          this.notificationServices.delete(id).subscribe(
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
