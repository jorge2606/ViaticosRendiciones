import { SolicitationSubsidyService } from './../../_services/solicitation-subsidy.service';
import { CodeLiquidationService } from './../../_services/code-liquidation.service';
import { CountryService } from './../../_services/country.service';
import { AllCountryDto } from './../../_models/country';
import { CityBaseDto } from './../../_models/city';
import { DestinyDto } from 'src/app/_models/destiny';
import { AddDestinyComponent } from './../../modals/add-destiny/add-destiny.component';
import { PlaceService } from './../../_services/place.service';
import { AllPlaceDto, PlaceBaseDto } from './../../_models/place';
import { AddNewExpenditureComponent } from './../../modals/add-new-expenditure/add-new-expenditure.component';
import { ExpenditureTypeBaseDto, AllExpenditureDto } from '../../_models/expenditureType';
import { ExpenditureService } from '../../_services/expenditure.service';
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
import { codeLiquidationBaseDto } from 'src/app/_models/codeLiquidation';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitationSubsidyComponent } from '../solicitation-subsidy.component';

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
  verOcultarIconDestiny = "arrow-circle-up";
  verOcultarTextDestiny = "Ocultar";
  verOcultarIconExpenditure = "arrow-circle-up";
  verOcultarTextExpenditure = "Ocultar";
  countries : AllCountryDto[] = [];
  codeLiquidations : codeLiquidationBaseDto[] = [];
  id : number;

  constructor(
      private route : ActivatedRoute,
      private router : Router,
      private motiveService : MotiveService,
      private expenditureService : ExpenditureService,
      private modalService: NgbModal,
      private destinyService : DestinyService,
      private provinceService : ProvinceService,
      private cityService : CityService,
      private categoryService : CategoryService,
      private transportService : TransportService,
      private countryService : CountryService,
      private codeLiquidationService : CodeLiquidationService,
      private solicitationSubsidy : SolicitationSubsidyService
      ) { }

  ngOnInit() {
    this.route.params.subscribe(
      x =>{
        this.id = x.id
    });

    if (this.id){
        this.solicitationSubsidy.getByIdSolicitation(this.id)
        .subscribe(
          x => {
                this.model = x;
                for (let index = 0; index < this.model.destinies.length; index++) {
                  let dateToShow = new Date(Date.parse(this.model.destinies[index].startDate));
                  this.model.destinies[index].startDate = {day : dateToShow.getDate(), month : dateToShow.getMonth()+1, year : dateToShow.getFullYear() };
                  
                }
                this.allProvice();
                }
        );
    }
      this.model.total = 0;
      this.model.destinies =[];
      this.model.expenditures = [];
      this.allMotive();
      this.allexpenditures();
      this.allExpenditureFromModal();
      this.allDestinyFromModal();
      this.allCategories();
      this.allTransport();
      this.allCountries();
      this.allCodeLiquidation();
    
  }

  allTransport(){
    this.transportService.getAll().subscribe(
      x => this.transports = x
    );
  }

  allCodeLiquidation(){
    this.codeLiquidationService.getAll()
    .subscribe(
      x => this.codeLiquidations = x
    );
  }

  allCountries(){
    this.countryService.getAllCountries()
    .subscribe(
      x => this.countries = x
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
                  if (x.cityId !== undefined && x.provinceId !== undefined){ 
                    //se ingreso una ciudad y una provincia
                    this.allProvice();
                    this.citiesThisProvince(x.provinceId);
                }
              }
            );
      }  
    );
  }

  citiesThisProvince(provinceId : number){
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
      let minus : number = 0;
      const index = this.model.expenditures.indexOf(expenditure, 0);
      minus = minus + expenditure.amount;
      if (index > -1) {
        this.model.expenditures.splice(index, 1);
      }
      
      if (this.model.total - minus >= 0){
        this.model.total = this.model.total - minus;
      }else{
        this.model.total = 0;
      }
      
   }

   removeDestiny(destiny : DestinyDto){
      let minus : number = 0;
      const index = this.model.destinies.indexOf(destiny, 0);
      let codLiq = this.codeLiquidations.find(x => x.id == destiny.codeLiquidationId);
      console.log(codLiq);
      let category = this.categories.find(x => x.id == destiny.categoryId);

      minus = minus + (codLiq.percentage * category.advance);
      if (index > -1) {
        this.model.destinies.splice(index, 1);
      }

      if (this.model.total - minus >= 0){
        this.model.total = this.model.total - minus;
      }else{
        this.model.total = 0;
      }
   }

   deleteAllConcepts(){
     let array = this.model.expenditures;
     let minus : number = 0;
     if (array === undefined){
       return;
     }
      for (let i = array.length - 1; i > -1; i--) {
          minus = minus + array[i].amount;
          const indexDeleteAll = this.model.expenditures.indexOf(array[i], 0);
          if (indexDeleteAll > -1) {
            this.model.expenditures.splice(indexDeleteAll, 1);
          }
      }

      if (this.model.total - minus >= 0){
        this.model.total = this.model.total - minus;
      }else{
        this.model.total = 0;
      }
   }

   deleteAllDestinies(){
    let array = this.model.destinies;
    let minus : number = 0;
    if (array === undefined){
      return;
    }
     for (let i = array.length - 1; i > -1; i--) {
          let codLiq = this.codeLiquidations.find(x => x.id == array[i].codeLiquidationId);
          let category = this.categories.find(x => x.id == array[i].categoryId);

          minus = minus + (codLiq.percentage * category.advance);
          console.log(minus);
          const indexDeleteAll = this.model.destinies.indexOf(array[i], 0);
          if (indexDeleteAll > -1) {
            this.model.destinies.splice(indexDeleteAll, 1);
          }
     }

      if (this.model.total - minus >= 0){
        this.model.total = this.model.total - minus;
      }else{
        this.model.total = 0;
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
      this.getResultExpenditure(this.model.expenditures);
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
    
    modalRef.result.then(
      x =>this.getResult(this.model.destinies)
    ,
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
      let array = this.model.destinies;
      for (let index = 0; index < array.length; index++) {
        const dataSend = array[index].startDate.day+"/"+array[index].startDate.month+"/"+array[index].startDate.year;
        this.model.destinies[index].startDate = dataSend;
      }

      if(this.id){
        this.solicitationSubsidy.updateSolicitation(this.model).subscribe(
          () => {
            this.router.navigate(['SolicitationSubsidy']);
          } 
        );
      }else{
        this.solicitationSubsidy.createSolicitation(this.model).subscribe(
          () => {
              this.router.navigate(['SolicitationSubsidy']);
          }
        );
      }

  }

  onChangeColapse(){
    this.isCollapsedDestiny = !this.isCollapsedDestiny;
    if (this.isCollapsedDestiny){
      this.verOcultarIconDestiny = "arrow-circle-down";
      this.verOcultarTextDestiny = "Ver";
      return
    }
    this.verOcultarIconDestiny = "arrow-circle-up";
    this.verOcultarTextDestiny = "Ocultar";
  }

  changeCollapseExpenditure(){
    this.isCollapsedExpenditure = !this.isCollapsedExpenditure;
    if (this.isCollapsedExpenditure){
      this.verOcultarIconExpenditure = "arrow-circle-down";
      this.verOcultarTextExpenditure = "Ver";
      return
    }
    this.verOcultarIconExpenditure = "arrow-circle-up";
    this.verOcultarTextExpenditure = "Ocultar";    
  }

  getResult(destinies : DestinyDto[]){
    if (destinies.length != 0){
      console.log(destinies);
      let resultTemp : number = 0;
      destinies.forEach(
        x => {
              let category = this.categories.find(category => category.id == x.categoryId);
              let codLiquidation = this.codeLiquidations.find(codLiq => codLiq.id == x.codeLiquidationId);
              resultTemp = resultTemp + (category.advance * codLiquidation.percentage);
            }
      );
  
      this.model.total = this.model.total + resultTemp;
    }

   }

   getResultExpenditure(expenditure : Expenditure[]){
     let resultTemp = 0;
      expenditure.forEach(
        x => {
            resultTemp = resultTemp + x.amount;
        }
      );
      this.model.total = this.model.total + resultTemp;
    }


}
