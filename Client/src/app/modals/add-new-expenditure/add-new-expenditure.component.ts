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
  selectedExpenditure : number;

  constructor(
          public activeModal: NgbActiveModal,
          private expenditureService : ExpenditureService) { }

  ngOnInit() {
    this.allExpenditure();
  }

  addNewConcept(){
    let exist;
    if (this.expendituresAdded != null){
      exist = this.expendituresAdded.find(x => x.expenditureTypeId == this.modelExp.id);
    }
    if (exist){
        this.msgExist = "Tipo de gasto ya existente";
        return;
    }
    
    this.msgExist = "";
    let newExp = new Expenditure();
    newExp.description = this.modelExp.description;
    newExp.amount = this.modelExp.amount;
    newExp.expenditureTypeId = this.modelExp.id;
    if (this.modelExp.id != null){
      newExp.expenditureTypeName = this.expendituresCbox.find(x => x.id == this.modelExp.id).name;
    }
    this.expendituresAdded = this.expendituresAdded || [];
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
