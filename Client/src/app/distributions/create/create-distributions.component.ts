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

  constructor(private ditributionService : DistributionService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.ditributionService.creteDistribution(this.model).subscribe(
      x=> this.responseSuccess = x,
      error => this.error = error.error.notifications
    );
  }

}
