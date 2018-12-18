import { AllExpenditureDto } from './../../_models/expenditure';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Expenditure } from 'src/app/_models/solicitationSubsidy';
import { ExpenditureService } from 'src/app/_services/expenditure.service';

@Component({
  selector: 'app-add-new-expenditure',
  templateUrl: './add-new-expenditure.component.html',
  styleUrls: ['./add-new-expenditure.component.css']
})
export class AddNewExpenditureComponent implements OnInit {

  modelExp = new Expenditure();
  @Input() expendituresAdded : Expenditure[] = [];
  expendituresCbox : AllExpenditureDto[] = [];
  constructor(
          public activeModal: NgbActiveModal,
          private expenditureService : ExpenditureService) { }

  ngOnInit() {
    this.allExpenditure();
  }

  addNewConcept(){
    let newExp = new Expenditure();
    newExp.id = this.modelExp.id;
    newExp.description = this.modelExp.description;
    newExp.cost = this.modelExp.cost;

    this.expendituresAdded.push(newExp);
    console.log(this.expendituresAdded);
    this.sendData();
  }

  sendData(){
    this.expenditureService.sendMessage(this.expendituresAdded);
  }

  allExpenditure(){
    this.expenditureService.getAll().subscribe(
      x => this.expendituresCbox = x
    );
  }


}
