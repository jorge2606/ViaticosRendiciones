import { AddDestinyComponent } from './../../modals/add-destiny/add-destiny.component';
import { PlaceService } from './../../_services/place.service';
import { AllPlaceDto, PlaceBaseDto } from './../../_models/place';
import { AddNewExpenditureComponent } from './../../modals/add-new-expenditure/add-new-expenditure.component';
import { ExpenditureBaseDto, AllExpenditureDto } from './../../_models/expenditure';
import { ExpenditureService } from './../../_services/expenditure.service';
import { MotiveService } from './../../_services/motive.service';
import { CityService } from './../../_services/city.service';
import { AllProvinceDto } from './../../_models/province';
import { AllCategoryDto } from './../../_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import { CreateSolicitationSubsidyDto, SolicitationSubsidyBaseDto, Expenditure } from './../../_models/solicitationSubsidy';
import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/_services/transport.service';
import { AllTransportDto } from 'src/app/_models/transport';
import { ProvinceService } from 'src/app/_services/province.service';
import { AllCitiesDto } from 'src/app/_models/city';
import { AllMotiveDto } from 'src/app/_models/motive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-solicitation',
  templateUrl: './create-solicitation.component.html',
  styleUrls: ['./create-solicitation.component.css']
})
export class CreateSolicitationComponent implements OnInit {

  categories : AllCategoryDto[];
  ConceptExpenditureList : Expenditure[]=[];
  subscription: Subscription;
  _disabled = false;
  transports : AllTransportDto[] = [];
  motives    : AllMotiveDto[] = []; 
  expenditures : AllExpenditureDto[];
  codeLiquidations : any[] = [{id : 1, name : 1}, {id : 2, name : 2}];
  model = new CreateSolicitationSubsidyDto;
  radioButtonRequired : boolean = true;
  

  constructor(
      private cetegoryService : CategoryService,
      private transportService : TransportService,
      private motiveService : MotiveService,
      private expenditureService : ExpenditureService,
      private modalService: NgbModal
      ) { }

  ngOnInit() {
    this.allCategories();
    this.allTransports();
    this.allMotive();
    this.allexpenditures();
    this.allExpenditureFromModal();
  }

  allExpenditureFromModal(){
    this.subscription = this.expenditureService.getMessage()
    .subscribe(
      x=>{
        this.model.expenditures = x
      },
      error => console.log(error)
    );
  }
  allCategories(){
    this.cetegoryService.getallCategories().subscribe(
      x => this.categories = x
      );
  }

  allTransports(){
    this.transportService.getAll().subscribe(
      x => this.transports = x
    );
  }

  allMotive(){
    this.motiveService.getAll().subscribe(
      x => this.motives = x
    );
  }

  allexpenditures(){
    this.expenditureService.getAll().subscribe(
      x => this.expenditures = x
    );
  }


  removePower(expenditure : Expenditure){
    const index = this.model.expenditures.indexOf(expenditure, 0);
    console.log(index);
      if (index > -1) {
        this.model.expenditures.splice(index, 1);
      }
   }

   deleteAllConcepts(){
     let array = this.model.expenditures;
     if (array === undefined){
       return;
     }
      for (let i = array.length; i > -1; i--) {
          const indexDeleteAll = this.model.expenditures.indexOf(array[i], 0);
          if (indexDeleteAll > -1) {
            this.model.expenditures.splice(indexDeleteAll, 1);
          }
      }
   }

     //MODALS
  openAddNewConcept() {
    const modalRef = this.modalService.open(AddNewExpenditureComponent);
    if (this.model.expenditures === undefined)
    {
      this.model.expenditures = [];
    }

    let listExpenditures : Expenditure[] = this.model.expenditures;

    modalRef.componentInstance.expendituresAdded = listExpenditures;
    modalRef.result.then(x=> {
      console.log(x);
    },
    j => {
      console.log(j);
      }
    );
  }

  AddDestiny(){
    const modalRef = this.modalService.open(AddDestinyComponent);
    modalRef.result.then(x=> {
      console.log(x);
    },
    j => {
      console.log(j);
      }
    );    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeValue(e : any){
    console.log(e);
  }

  onSubmit(){
      console.log(this.model);
  }

}
