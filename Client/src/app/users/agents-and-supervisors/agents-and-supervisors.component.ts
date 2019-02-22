import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { SupervisorUserAgentService } from 'src/app/_services/supervisor-user-agent.service';
import { AllSupervisorUserAgent } from 'src/app/_models/supervisorUserAgent';
import { Title } from '@angular/platform-browser';
import { NgbdModalContent } from 'src/app/modals/modals.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agents-and-supervisors',
  templateUrl: './agents-and-supervisors.component.html',
  styleUrls: ['./agents-and-supervisors.component.css']
})
export class AgentsAndSupervisorsComponent implements OnInit {

  agentsSupervisors : AllSupervisorUserAgent[];
  
  constructor(
          private agentsAndSupervisors : SupervisorUserAgentService,
          private titleService : Title,
          private modalService: NgbModal,
          private toastrService : ToastrService) { }

  ngOnInit() {
    this.titleService.setTitle('Agentes y Supervisores');
    this.getUserAgents();

  }

  getUserAgents(){
    this.agentsAndSupervisors.getAll()
    .subscribe(
      x =>{
          this.agentsSupervisors = x;
      }
    );
  }

  openEliminar(supervisor : any, agent : any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.Encabezado = "Eliminar";
    modalRef.componentInstance.Contenido = "¿Desea desasignar a " + agent.lastName+", "+agent.firstName + " de " + supervisor.lastName+", "+supervisor.firstName + "?";
    modalRef.componentInstance.GuardaroEliminar = "Eliminar";
    modalRef.componentInstance.MsgClose = "Cancelar";
    modalRef.componentInstance.GuardaroEliminarClass="btn-danger";
    modalRef.result.then(() => {
      this.agentsAndSupervisors.deleteRelationshipBetweenAgentAndSupervisor(supervisor.id,agent.id)
        .subscribe(
        data => {
          this.toastrService.success("El Agente '"+agent.lastName+", "
          +agent.firstName+"' se desasigno correctamente del supervisor "+supervisor.lastName+", "
          +supervisor.firstName,'', {positionClass : 'toast-top-center', timeOut : 3000});
          this.getUserAgents();
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
