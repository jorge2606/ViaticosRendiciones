import { CreateSolicitationSubsidyDto } from './../../_models/solicitationSubsidy';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-solicitation',
  templateUrl: './create-solicitation.component.html',
  styleUrls: ['./create-solicitation.component.css']
})
export class CreateSolicitationComponent implements OnInit {

  model = new CreateSolicitationSubsidyDto;
  constructor() { }

  ngOnInit() {
  }

}
