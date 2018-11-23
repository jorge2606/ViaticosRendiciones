import { Component, OnInit } from '@angular/core';
import { CreateExpenditureDto } from 'src/app/_models/expenditure';
import { ExpenditureService } from 'src/app/_services/expenditure.service';

@Component({
  selector: 'app-create-expenditure',
  templateUrl: './create-expenditure.component.html',
  styleUrls: ['./create-expenditure.component.css']
})
export class CreateExpenditureComponent implements OnInit {

  model = new CreateExpenditureDto();
  error = '';
  responseSuccess : any;

  constructor(private expenditureService : ExpenditureService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.expenditureService.createExpenditure(this.model).subscribe(
      x=>this.responseSuccess = x,
      error => this.error = error.error.notifications
    );
  }

}
