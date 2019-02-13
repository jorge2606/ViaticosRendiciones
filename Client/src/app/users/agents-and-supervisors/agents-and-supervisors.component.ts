import { Component, OnInit } from '@angular/core';
import { SupervisorUserAgentService } from 'src/app/_services/supervisor-user-agent.service';
import { AllSupervisorUserAgent } from 'src/app/_models/supervisorUserAgent';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-agents-and-supervisors',
  templateUrl: './agents-and-supervisors.component.html',
  styleUrls: ['./agents-and-supervisors.component.css']
})
export class AgentsAndSupervisorsComponent implements OnInit {

  agentsSupervisors : AllSupervisorUserAgent[];
  
  constructor(
          private agentsAndSupervisors : SupervisorUserAgentService,
          private titleService : Title) { }

  ngOnInit() {
    this.titleService.setTitle('Agentes y Supervisores');
    this.agentsAndSupervisors.getAll()
    .subscribe(
      x =>{
          this.agentsSupervisors = x;
      }
    );

  }

}
