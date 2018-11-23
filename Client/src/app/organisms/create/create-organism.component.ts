import { CreateOrganismDto } from './../../_models/organism';
import { Component, OnInit } from '@angular/core';
import { OrganismService } from 'src/app/_services/organism.service';

@Component({
  selector: 'app-create-organism',
  templateUrl: './create-organism.component.html',
  styleUrls: ['./create-organism.component.css']
})
export class CreateOrganismComponent implements OnInit {

  responseSuccess : any;
  error = '';
  model = new CreateOrganismDto();
  constructor(private organismServcice : OrganismService) { }

  ngOnInit() {}

    onSubmit(){
      this.organismServcice.createOrganism(this.model).subscribe(
        x=>this.responseSuccess = x,
        error => this.error = error.error.notifications
      );
    }
  
}
