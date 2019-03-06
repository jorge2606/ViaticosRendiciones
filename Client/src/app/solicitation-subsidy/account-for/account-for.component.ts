import { Component, OnInit } from '@angular/core';
import { Expenditure, CreateSolicitationSubsidyDto } from 'src/app/_models/solicitationSubsidy';
import { ActivatedRoute } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { AllCategoryDto } from 'src/app/_models/category';
import { AllTransportDto } from 'src/app/_models/transport';
import { Subscription } from 'rxjs';
import { AllExpenditureDto } from 'src/app/_models/expenditureType';
import { DestinyDto } from 'src/app/_models/destiny';
import { ProvinceBaseDto } from 'src/app/_models/province';
import { CityBaseDto } from 'src/app/_models/city';
import { AllCountryDto } from 'src/app/_models/country';
import { codeLiquidationBaseDto } from 'src/app/_models/codeLiquidation';
import { environment } from 'src/environments/environment';
import { ExpenditureService } from 'src/app/_services/expenditure.service';
import { DestinyService } from 'src/app/_services/destiny.service';
import { ProvinceService } from 'src/app/_services/province.service';
import { CityService } from 'src/app/_services/city.service';
import { CategoryService } from 'src/app/_services/category.service';
import { TransportService } from 'src/app/_services/transport.service';
import { CountryService } from 'src/app/_services/country.service';
import { CodeLiquidationService } from 'src/app/_services/code-liquidation.service';
import { ExpendituresUserService } from 'src/app/_services/expenditures-user.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AddExpenditureRepaymentComponent } from 'src/app/modals/add-expenditure-repayment/add-expenditure-repayment.component';
import { AddDestinyComponent } from 'src/app/modals/add-destiny/add-destiny.component';

@Component({
  selector: 'app-account-for',
  templateUrl: './account-for.component.html',
  styleUrls: ['./account-for.component.css']
})
export class AccountForComponent implements OnInit {
  uploader:FileUploader;
  isCollapsedDestiny = false;
  categories : AllCategoryDto[] = [];
  transports : AllTransportDto[] = [];
  isCollapsedExpenditure = false;
  ConceptExpenditureList : Expenditure[]=[];
  subscriptionExpenditure: Subscription;
  subscriptionDestiny : Subscription;
  _disabled = false;
  expenditures : AllExpenditureDto[];
  Allexpenditures : AllExpenditureDto[];
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
  citiesModify : CityBaseDto[] = [];
  msj = '';
  msjExito = '';
  msjWhenUserTryDeleteLastDestiny = '';
  supplementariesCities : string[];
  urlImage : string;
  idUser : number;
  id:number;
  url = '';
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl; 

  constructor(
      private activateRouter : ActivatedRoute,
      private expenditureService : ExpenditureService,
      private modalService: NgbModal,
      private destinyService : DestinyService,
      private provinceService : ProvinceService,
      private cityService : CityService,
      private categoryService : CategoryService,
      private transportService : TransportService,
      private countryService : CountryService,
      private codeLiquidationService : CodeLiquidationService,
      private solicitationSubsidyService : SolicitationSubsidyService,
      private expenditureAgentService : ExpendituresUserService,
      private titleService : Title,
      private toastrService: ToastrService,
      private authService : AuthenticationService
      ) { }

  ngOnInit() {
    this.titleService.setTitle('Crear Reintegro');
    this.model.destinies = [];
    this.model.expenditures = [];

    this.activateRouter.params.subscribe(
      x =>{
        this.id = x.id
    });
    if (this.id){
      this.solicitationSubsidyService
      .getByIdSolicitation(this.id)
      .subscribe(x => {
        this.model = x;
      });
    }

    this.allexpenditures();
    this.allExpenditureFromModal();
    this.allDestinyFromModal();
    this.allCategories();
    this.allTransport();
    this.allCountries();
    this.allCodeLiquidation();
    this.allProvice();
    this.totalResultExpenditure();
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
                  if (
                    x.cityId !== undefined 
                    && x.provinceId !== undefined
                    && x.cityId != null
                    && x.provinceId != null){ 
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


  citiesThisProvinceModify(provinceId : number){
    this.cityService.GetByIdCity(provinceId).subscribe(
      x=>{
          this.cities = this.citiesModify.concat(x);
         } 
    );
  }

  allExpenditureFromModal(){
    this.subscriptionExpenditure = this.expenditureService.getMessage()
    .subscribe(
      x=>{
        this.model.expenditures = x;
      },
      error => console.log(error)
    );
  }

  allexpenditures(){
    this.expenditureService.getAll().subscribe(
      x => {this.Allexpenditures = x}
    );
  }


  removeExpenditure(expenditure : Expenditure){
      let minus : number = 0;
      const index = this.model.expenditures.indexOf(expenditure, 0);
      minus = minus + expenditure.amount;
      if (index > -1) {
        this.model.expenditures.splice(index, 1);
        this.deleteFromDatabaseExpenditure(expenditure.id);
      }
      
      this.totalResultExpenditure();
      
   }

   removeDestiny(destiny : DestinyDto){
      
        let minus : number = 0;
        const index = this.model.destinies.indexOf(destiny, 0);
        let codLiq = this.codeLiquidations.find(x => x.id == destiny.codeLiquidationId);
        
        let category = this.categories.find(x => x.id == destiny.categoryId);
  
        minus = minus + (codLiq.percentage * category.advance);
        if (index > -1) {
          
          if (destiny.id){
            if(this.model.destinies.length > 1){
              this.deleteFromDatabaseDestinies(destiny.id,index);
            }else{
              this.msjToastInfo("Un reintegro de viático debe contener al menos 1 destino");
            }
          }else{
            this.model.destinies.splice(index, 1);
          }

        }
  
        this.totalResultExpenditure();

   }

   initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl+'SolicitationSubsidy/Create/',
      authToken: 'Bearer ' + this.authService.userId('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response) => {
      if (response) {
      }
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
            this.deleteFromDatabaseExpenditure(this.model.expenditures[i].id);
            this.model.expenditures.splice(indexDeleteAll, 1);
          }
      }

      this.totalResultExpenditure();
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
          const indexDeleteAll = this.model.destinies.indexOf(array[i], 0);
          if (indexDeleteAll > -1) {
            //this.deleteFromDatabaseDestinies(array[i].id,indexDeleteAll);
            this.model.destinies.splice(indexDeleteAll, 1);
          }
     }
     this.totalResultExpenditure();
  }

     //MODALS
  openAddNewConcept() {
    const modalRef = this.modalService.open(AddExpenditureRepaymentComponent);
    if (this.model.expenditures === undefined)
    {
      this.model.expenditures = [];
    }

    let listExpenditures : Expenditure[] = this.model.expenditures;

    modalRef.componentInstance.expendituresAdded = listExpenditures;
    modalRef.result.then(()=> {
      this.totalResultExpenditure();
    },
    j => {
        console.log(j);      
      }
    );
  }


  AddDestiny(){
    const modalRef = this.modalService.open(AddDestinyComponent,{size : 'lg'});

    if (this.model.destinies === undefined)
    {
      this.model.destinies = [];
    }

    let listDestinies : DestinyDto[] = this.model.destinies;
    
    modalRef.componentInstance.destiniesAdded = listDestinies;
    
    modalRef.result.then(
      () =>this.totalResultExpenditure()
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

  deleteFromDatabaseExpenditure(id : number){
    this.expenditureAgentService.delete(id)
    .subscribe(
      () => []
    );
  }

  deleteFromDatabaseDestinies(id : number, index : number){
    this.destinyService.delete(id)
    .subscribe(
      () => {
        this.model.destinies.splice(index, 1);
      },
      e => {
                var errors : any = e.error.notifications;
                errors.forEach(element => {
                  this.msjWhenUserTryDeleteLastDestiny = element.value
                })

                this.msjToastInfo(this.msjWhenUserTryDeleteLastDestiny);
            }
    
    );
  }

  msjToastError(msg : string){
    this.toastrService.error(msg,'',
    {positionClass : 'toast-top-center', timeOut : 3000});
  }

  msjToastSuccess(msg : string){
    this.toastrService.success(msg,'',
    {positionClass : 'toast-top-center', timeOut : 3000});
  }

  msjToastInfo(msg : string){
    this.toastrService.info(msg,'',
    {positionClass : 'toast-top-center', timeOut : 3000});
  }


  onSubmit(){
    if (this.model.destinies.length == 0){
      this.msjToastInfo('Debe ingresar al menos un destino');
      return;
    }
    
    console.log(this.model);

     /* this.solicitationSubsidyService.createSolicitation(this.model).subscribe(
        () => {
            this.router.navigate(['SolicitationSubsidy/agent']);
            this.msjExito = 'Solicitud Actualizada';
            this.msjToastSuccess('El reintegro de viático se ha guardado correctamente');
        }
      ); 
    */  
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

    totalResultExpenditure(){
      let resultExpenditure = 0;
      let resultDestiny = 0;
      this.model.expenditures.forEach(
        expenditure => resultExpenditure = resultExpenditure +  expenditure.amount
      );

      this.model.destinies.forEach(
        destiny => {
          resultDestiny = resultDestiny + (destiny.advanceCategory * destiny.days * destiny.percentageCodeLiquidation);
        }
      );
      this.model.total = resultExpenditure + resultDestiny;
    }

    toSeeImageBase64InNewTab(data) {
      var image = new Image();
      image.src = data;
      image.width=100;
      image.height=100;

      this.solicitationSubsidyService.getImageRefundExpenditure(this.id,186,60)
      .subscribe(x => {
        image.src = "data:image/jpg;base64,"+x.response;
      },
      e => {
        console.log('error consolelog : '+e);
      });
      var w = window.open("");
      w.document.write(image.outerHTML);
    }
}
