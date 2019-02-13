import { Title } from '@angular/platform-browser';
import { OrganismService } from 'src/app/_services/organism.service';
import { DistributionService } from './../../_services/distribution.service';
import { CreateDistributionDto } from './../../_models/distributions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-distributions',
  templateUrl: './create-distributions.component.html',
  styleUrls: ['./create-distributions.component.css']
})
export class CreateDistributionsComponent implements OnInit {

  model = new CreateDistributionDto();
  error : any;
  responseSuccess : any;
  selectedOrganismId : number;

  organism : any[];

  constructor(
              private ditributionService : DistributionService, 
              private organismService : OrganismService,
              private titleService : Title) { 
                this.titleService.setTitle('Crear Distribución');
              }

  ngOnInit() {

    this.organismService.getAllOrganism().subscribe(
      x => this.organism = x,
      error => this.error = error
    );

  }

  onSubmit(){
    this.ditributionService.creteDistribution(this.model).subscribe(
      x=> this.responseSuccess = x,
      error => this.error = error.error.notifications
    );
  }

}
