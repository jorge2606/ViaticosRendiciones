import { AllExpenditureDto } from '../../_models/expenditureType';
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
  msgExist : string;

  constructor(
          public activeModal: NgbActiveModal,
          private expenditureService : ExpenditureService) { }

  ngOnInit() {
    this.allExpenditure();
  }

  addNewConcept(){
    let result = this.expendituresAdded.find(x => x.id == this.modelExp.id);
    if (result !== undefined){
        this.msgExist = "Tipo de gasto ya existente";
        return;
    }
    
    this.msgExist = "";
    let newExp = new Expenditure();
    newExp.id = this.modelExp.id;
    newExp.description = this.modelExp.description;
    newExp.amount = this.modelExp.amount;
    newExp.expenditureTypeId = this.modelExp.id;

    this.expendituresAdded.push(newExp);
    this.sendData();
  }

  sendData(){
    this.expenditureService.sendMessage(this.expendituresAdded);
    this.activeModal.close(null);
  }

  allExpenditure(){
    this.expenditureService.getAll().subscribe(
      x => this.expendituresCbox = x
    );
  }


}
