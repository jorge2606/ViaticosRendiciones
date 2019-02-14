import { Title } from '@angular/platform-browser';
import { OrganismService } from 'src/app/_services/organism.service';
import { DistributionService } from './../../_services/distribution.service';
import { CreateDistributionDto } from './../../_models/distributions';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-distributions',
  templateUrl: './create-distributions.component.html',
  styleUrls: ['./create-distributions.component.css']
})
export class CreateDistributionsComponent implements OnInit {

  model = new CreateDistributionDto();
  error : any;
  selectedOrganismId : number;

  organism : any[];

  constructor(
              private ditributionService : DistributionService, 
              private organismService : OrganismService,
              private titleService : Title,
              private toastrService : ToastrService,
              private routerService : Router
              ) { 
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
      x=>{
          this.routerService.navigate(['/distribution']);
          this.toastrService.success("La distribución '"+this.model.name+"' se ha modificado correctamente.",'',
          {positionClass : 'toast-top-center', timeOut : 3000});
      },
      error => this.error = error.error.notifications
    );
  }

}
