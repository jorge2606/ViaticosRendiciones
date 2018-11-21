import { DistributionsComponent } from './../distributions.component';
import { UpdateCategoryDto } from './../../_models/category';
import { DistributionService } from './../../_services/distribution.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-distribution',
  templateUrl: './modify-distribution.component.html',
  styleUrls: ['./modify-distribution.component.css']
})
export class ModifyDistributionComponent implements OnInit {

  private id : number;
  private model = new UpdateCategoryDto();

  constructor(private route : ActivatedRoute,
    private router : Router,
    private distributionService : DistributionService) { }

  ngOnInit() {
    //le asigno el id que extraigo de la url
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.distributionService.findByIdDistribution(this.id).subscribe(
      x => {this.model.id = x.id, this.model.name = x.name, this.model.description = x.description}
    );
  }

  onSubmit() {
    this.model.id = this.id;
    this.distributionService.updateDistribution(this.model).subscribe(
      () => {
        this.router.navigate(['/distribution']);
      },
        () => {
      }      
    );
    this.router.navigate([DistributionsComponent]);
  }

}
