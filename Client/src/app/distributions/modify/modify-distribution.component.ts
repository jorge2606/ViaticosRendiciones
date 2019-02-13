import { Title } from '@angular/platform-browser';
import { UpdateOrganismDto } from 'src/app/_models/organism';
import { UpdateDistributionDto } from './../../_models/distributions';
import { DistributionsComponent } from './../distributions.component';
import { UpdateCategoryDto } from './../../_models/category';
import { DistributionService } from './../../_services/distribution.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { OrganismService } from 'src/app/_services/organism.service';

@Component({
  selector: 'app-modify-distribution',
  templateUrl: './modify-distribution.component.html',
  styleUrls: ['./modify-distribution.component.css']
})
export class ModifyDistributionComponent implements OnInit {

  id : number;
  model = new UpdateDistributionDto();
  error = '';
  responseSuccess : any;
  selectedOrganismId : number;

  organism :  any[];

  constructor(private route : ActivatedRoute,
              private router : Router,
              private distributionService : DistributionService, 
              private organismService : OrganismService,
              private titleService : Title) {
                this.titleService.setTitle('Modificar Repartición');
               }

  ngOnInit() {
    //le asigno el id que extraigo de la url
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.distributionService.findByIdDistribution(this.id).subscribe(
      x => {
            this.model.id = x.id, 
            this.model.name = x.name, 
            this.model.description = x.description,
            this.model.organismId = x.organismId
          }
    );

    this.organismService.getAllOrganism().subscribe(
      x => this.organism = x,
      error => this.error = error
    );
  }

  onSubmit() {
    this.model.id = this.id;
    this.distributionService.updateDistribution(this.model).subscribe(
      x => {
        this.responseSuccess = x;
        //this.router.navigate(['/distribution']);
      },
        error => {
          this.error = error.error.notifications
      }      
    );
    //this.router.navigate(['/distribution']);
  }

}
