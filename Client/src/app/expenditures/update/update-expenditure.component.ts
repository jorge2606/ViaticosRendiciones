import { Component, OnInit } from '@angular/core';
import { UpdateExpenditureDto } from 'src/app/_models/expenditure';
import { ExpenditureService } from 'src/app/_services/expenditure.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-expenditure',
  templateUrl: './update-expenditure.component.html',
  styleUrls: ['./update-expenditure.component.css']
})
export class UpdateExpenditureComponent implements OnInit {

  model = new UpdateExpenditureDto();
  error = '';
  id : number;

  responseSuccess : any;

  constructor(private expenditureService : ExpenditureService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.expenditureService.findByIdExpenditure(this.id).subscribe(
      x => {this.model.id = x.id, this.model.name = x.name, this.model.description = x.description}
    );
  }

  onSubmit(){
    this.expenditureService.updateExpenditure(this.model).subscribe(
      x=> this.responseSuccess = x,
      error => this.error = error.error.notifications
    );
  }
}
