import { Component, OnInit } from '@angular/core';
import { SolicitationIdDto } from 'src/app/_models/solicitationSubsidy';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acept-or-refuse',
  templateUrl: './acept-or-refuse.component.html',
  styleUrls: ['./acept-or-refuse.component.css']
})
export class AceptOrRefuseComponent implements OnInit {

  model = new SolicitationIdDto();
  msjSuccess = '';
  msjError = '';

    constructor(
        private solicitationSubsidyService : SolicitationSubsidyService,
        private router : ActivatedRoute
    ) { }

  ngOnInit() {
      this.router.params.subscribe(
        x => {this.model.id = x.id}
      );
  }

  acepted(){
    this.solicitationSubsidyService.Acepted(this.model)
    .subscribe(
      x => {this.msjSuccess = 'Solicitud Aceptada'}
      ,error => {this.msjError='Error'}
    );
  }

  reject(){
    this.solicitationSubsidyService.refused(this.model)
    .subscribe(
      x => {this.msjSuccess = 'Solicitud Rechazada'}
      ,error => {this.msjError = 'Error'}
    );
  }

}
