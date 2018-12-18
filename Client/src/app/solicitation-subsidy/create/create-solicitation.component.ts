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
  transports : AllTransportDto[];
  provinces  : AllProvinceDto[];
  cities     : AllCitiesDto[];
  motives    : AllMotiveDto[]; 
  expenditures : AllExpenditureDto[];
  codeLiquidations : any[] = [{id : 1, name : 1}, {id : 2, name : 2}];
  model = new CreateSolicitationSubsidyDto;
  

  constructor(
      private cetegoryService : CategoryService,
      private transportService : TransportService,
      private provinceService : ProvinceService,
      private cityService : CityService,
      private motiveService : MotiveService,
      private expenditureService : ExpenditureService,
      private modalService: NgbModal
      ) {
        this.subscription = this.expenditureService.getMessage()
        .subscribe(
          x=>{
            this.model.expenditures = x
          },
          error => console.log(error)
        );
       }

  ngOnInit() {        
    this.allCategories();
    this.allTransports();
    this.allProvince();
    this.allCity();
    this.allMotive();
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

  allProvince(){
    this.provinceService.getAll().subscribe(
      x => this.provinces = x
    );
  }

  allCity(){
    this.cityService.getAll().subscribe(
      x => this.cities = x
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

  disabled(){
   this._disabled = false;
  }

  updateConcept(updateConcept : Expenditure){
    this._disabled = true;
  }


  addNewConcept(){
    this.model.expenditures.push(new Expenditure());
  }

  removePower(expenditure : Expenditure){
    const index = this.model.expenditures.indexOf(expenditure, 0);
    console.log(index);
      if (index > -1) {
        this.model.expenditures.splice(index, 1);
      }
    console.log(this.model.expenditures);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeValue($e : any){
    console.log($e);
  }

}
