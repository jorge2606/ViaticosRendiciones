import { CityBaseDto } from './../../_models/city';
import { DestinyDto } from 'src/app/_models/destiny';
import { AddDestinyComponent } from './../../modals/add-destiny/add-destiny.component';
import { PlaceService } from './../../_services/place.service';
import { AllPlaceDto, PlaceBaseDto } from './../../_models/place';
import { AddNewExpenditureComponent } from './../../modals/add-new-expenditure/add-new-expenditure.component';
import { ExpenditureBaseDto, AllExpenditureDto } from './../../_models/expenditure';
import { ExpenditureService } from './../../_services/expenditure.service';
import { MotiveService } from './../../_services/motive.service';
import { CityService } from './../../_services/city.service';
import { AllProvinceDto, ProvinceBaseDto } from './../../_models/province';
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
import { DestinyService } from 'src/app/_services/destiny.service';

@Component({
  selector: 'app-create-solicitation',
  templateUrl: './create-solicitation.component.html',
  styleUrls: ['./create-solicitation.component.css']
})
export class CreateSolicitationComponent implements OnInit {

  isCollapsedDestiny = false;
  categories : AllCategoryDto[] = [];
  transports : AllTransportDto[] = [];
  isCollapsedExpenditure = false;
  ConceptExpenditureList : Expenditure[]=[];
  subscriptionExpenditure: Subscription;
  subscriptionDestiny : Subscription;
  _disabled = false;
  motives    : AllMotiveDto[] = []; 
  expenditures : AllExpenditureDto[];
  destinies : DestinyDto[] = [];
  model = new CreateSolicitationSubsidyDto;
  radioButtonRequired : boolean = true;
  provinces : ProvinceBaseDto[];
  cities : CityBaseDto[];
  verOcultarIcon = "arrow-circle-up";
  verOcultarText = "Ocultar";
  

  constructor(
      private motiveService : MotiveService,
      private expenditureService : ExpenditureService,
      private modalService: NgbModal,
      private destinyService : DestinyService,
      private provinceService : ProvinceService,
      private cityService : CityService,
      private categoryService : CategoryService,
      private transportService : TransportService
      ) { }

  ngOnInit() {
    this.model.destinies =[];
    this.model.expenditures = [];
    this.allMotive();
    this.allexpenditures();
    this.allExpenditureFromModal();
    this.allDestinyFromModal();
    this.allCategories();
    this.allTransport();
  }

  allTransport(){
    this.transportService.getAll().subscribe(
      x => this.transports = x
    );
  }
  allCategories(){
    this.categoryService.getallCategories()
    .subscribe(
      x=> this.categories = x
    );
  }  
  allProvice(){
    this.provinceService.getAll()
    .subscribe(
      x=> this.provinces = x
    );
  }

  allDestinyFromModal(){
    this.subscriptionDestiny = this.destinyService.getMessage()
    .subscribe(
      x =>{
            this.model.destinies = x;
            x.forEach(
              x =>{
                  if (x.cityId != null && x.provinceId != null){ 
                    //se ingreso una ciudad y una provincia
                    this.allProvice();
                    this.citiesThisProvince(x.provinceId);
                }
              }
            );
      }  
    );
  }

  citiesThisProvince(provinceId : any){
    this.cityService.GetByIdCity(provinceId).subscribe(
      x=>{
          this.cities = x;
         } 
    );
  }

  allExpenditureFromModal(){
    this.subscriptionExpenditure = this.expenditureService.getMessage()
    .subscribe(
      x=>{
        this.model.expenditures = x
      },
      error => console.log(error)
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
      if (index > -1) {
        this.model.expenditures.splice(index, 1);
      }
   }

   removeDestiny(destiny : DestinyDto){
    const index = this.model.destinies.indexOf(destiny, 0);
      if (index > -1) {
        this.model.destinies.splice(index, 1);
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

   deleteAllDestinies(){
    let array = this.model.destinies;
    if (array === undefined){
      return;
    }
     for (let i = array.length; i > -1; i--) {
         const indexDeleteAll = this.model.destinies.indexOf(array[i], 0);
         if (indexDeleteAll > -1) {
           this.model.destinies.splice(indexDeleteAll, 1);
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

    if (this.model.destinies === undefined)
    {
      this.model.destinies = [];
    }

    let listDestinies : DestinyDto[] = this.model.destinies;

    modalRef.componentInstance.destiniesAdded = listDestinies;

    modalRef.result.then(x=> {
      console.log(x);
    },
    j => {
      console.log(j);
      }
    );    
  }

  ngOnDestroy() {
    this.subscriptionExpenditure.unsubscribe();
    this.subscriptionDestiny.unsubscribe();
  }

  changeValue(e : any){
    console.log(e);
  }

  onSubmit(){
      console.log(this.model);
  }

  onChangeColapse(){
    this.isCollapsedDestiny = !this.isCollapsedDestiny;
    if (this.isCollapsedDestiny){
      this.verOcultarIcon = "arrow-circle-down";
      this.verOcultarText = "Ver";
      return
    }
    this.verOcultarIcon = "arrow-circle-up";
    this.verOcultarText = "Ocultar";
  }

  changeCollapseExpenditure(){
    this.isCollapsedExpenditure = !this.isCollapsedExpenditure;
    if (this.isCollapsedExpenditure){
      this.verOcultarIcon = "arrow-circle-down";
      this.verOcultarText = "Ver";
      return
    }
    this.verOcultarIcon = "arrow-circle-up";
    this.verOcultarText = "Ocultar";    
  }

}
