import { ExpenditureForModifyingDto, ImageDto } from './../../_models/solicitationSubsidy';
import { destinyForModifyingSolicitationDto } from './../../_models/destiny';
import { AddDestinyRepaymentComponent } from './../../modals/add-destiny-repayment/add-destiny-repayment.component';
import { AuthenticationService } from './../../_services/authentication.service';
import { AddExpenditureRepaymentComponent } from './../../modals/add-expenditure-repayment/add-expenditure-repayment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { NgbModal, NgbDate, NgbCalendar, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AllCategoryDto } from 'src/app/_models/category';
import { AllTransportDto } from 'src/app/_models/transport';
import { Expenditure, CreateSolicitationSubsidyDto } from 'src/app/_models/solicitationSubsidy';
import { Subscription } from 'rxjs';
import { AllExpenditureDto } from 'src/app/_models/expenditureType';
import { ProvinceBaseDto } from 'src/app/_models/province';
import { CityBaseDto } from 'src/app/_models/city';
import { AllCountryDto } from 'src/app/_models/country';
import { codeLiquidationBaseDto } from 'src/app/_models/codeLiquidation';
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
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit {

 
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
  destinies : destinyForModifyingSolicitationDto[] = [];
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
  msjWhenUserTryDeleteLastDestiny = '';
  supplementariesCities : string[];
  urlImage : string;
  idUser : number;
  id:number;
  url = '';
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl; 
  dirtyForm : boolean;
  submmited : boolean = false;
  image : ImageDto;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };
  @ViewChild('solicitationSubsidy') formRepayment : FormGroup;

  
  constructor(
      private router : Router,
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
      private authService : AuthenticationService,
      private ngbCalendar : NgbCalendar,
      private lightbox : CrystalLightbox  ) { }

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
      .getByIdSolicitationNotAccountFor(this.id)
      .subscribe(x => {
        this.model = x;
        this.model.expenditures.forEach(
          j => {
            this.solicitationSubsidyService.getUrlImageExpenditure(j.id,186,60)
            .subscribe(urlImg => {
              if(urlImg.response != ""){
                j.urlImage = "data:image/jpg;base64,"+urlImg.response;
              }
            });
          }
        );
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
    this.initializeUploader();
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
        //this.deleteFromDatabaseExpenditure(expenditure.id);
      }
      
      this.totalResultExpenditure();
      
   }

   removeDestiny(destiny : destinyForModifyingSolicitationDto){
      
        let minus : number = 0;
        const index = this.model.destinies.indexOf(destiny, 0);
        let codLiq = this.codeLiquidations.find(x => x.id == destiny.codeLiquidationId);
        
        let category = this.categories.find(x => x.id == destiny.categoryId);
  
        minus = minus + (codLiq.percentage * category.advance);
        if (index > -1) {
            this.model.destinies.splice(index, 1);
        }
  
        this.totalResultExpenditure();

   }

   initializeUploader() {
    this.uploader = new FileUploader({
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
            //this.deleteFromDatabaseExpenditure(this.model.expenditures[i].id);
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
    const modalRef = this.modalService.open(AddExpenditureRepaymentComponent,{
      backdrop : 'static',
      keyboard : false
    });
    if (this.model.expenditures === undefined)
    {
      this.model.expenditures = [];
    }

    let listExpenditures : ExpenditureForModifyingDto[] = this.model.expenditures;

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
    this.ngbModalOptions.size='lg';
    const modalRef = this.modalService.open(AddDestinyRepaymentComponent,this.ngbModalOptions);

    if (this.model.destinies === undefined)
    {
      this.model.destinies = [];
    }

    let listDestinies : destinyForModifyingSolicitationDto[] = this.model.destinies;
    
    modalRef.componentInstance.destiniesAdded = listDestinies;
    modalRef.componentInstance.solicitationId = this.id;
    
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

  onSelectFile(newExp : any , event) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event : any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        newExp.urlImage = this.url;
      }

      let img = new ImageDto()
      img.name = this.image.name;
      img.type = this.image.type;
      img.size = this.image.size;
      img.webkitRelativePath = this.image.webkitRelativePath;
      img.lastModified = this.image.lastModified;
      img.lastModifiedDate = this.image.lastModifiedDate;
  
      newExp.imageDto = img;
    }
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
    this.submmited = true;
    if (this.model.destinies.length == 0){
      this.msjToastInfo('Debe ingresar al menos un destino');
      this.submmited = false;
    }
    this.model.expenditures.forEach(
      j => {
        if(!j.urlImage){
          this.toastrService.info('No se ha seleccionado ninguna imagen del concepto "'+ j.expenditureTypeName+'".');
          this.submmited = false;
        }
      }
    );

    if (!this.submmited){
      return;
    }

    this.calculateHolidaysAndWeekEnds();
    
    this.model.isRefund = true;

    if(this.id){
      this.solicitationSubsidyService.updateSolicitation(this.model).subscribe(
        () => {
          this.router.navigate(['SolicitationSubsidy/agent']);
          this.msjToastSuccess('La solicitud de viático se ha modificado correctamente');
        },
        error => console.log(error) 
      );
    }else{
      this.solicitationSubsidyService.createSolicitation(this.model).subscribe(
        () => {
            this.router.navigate(['SolicitationSubsidy/agent']);
            this.msjToastSuccess('El reintegro de viático se ha guardado correctamente');
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

  totalResultExpenditure(){
    let resultExpenditure = 0;
    let resultDestiny = 0;
    this.model.expenditures.forEach(
      expenditure => resultExpenditure = resultExpenditure +  expenditure.amount
    );

    this.model.destinies.forEach(
      destiny => {
        resultDestiny = resultDestiny + (destiny.advanceCategory * destiny.daysPay * destiny.percentageCodeLiquidation);
      }
    );
    this.model.total = resultExpenditure + resultDestiny;
  }


  calculateHolidaysAndWeekEnds(){
    this.model.destinies.forEach(dest =>{
      if (!dest.id){
      
        for (let i = 0; i <= dest.days; i++) {
          var date = new Date(dest.startDate.year, dest.startDate.month - 1, dest.startDate.day);
          date.setDate(date.getDate() + i);
          let dateNow = new  NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
          //es Fin de semana
          let isWeekend = this.ngbCalendar.getWeekday(dateNow);
          if (isWeekend == 6 || isWeekend == 7){
            //contamos la cantidad de dias no laborables
            dest.daysWeekEnd = dest.daysWeekEnd + 1;
          }
        }
      
      }
    });
  }

  hasUnsavedData(){
    return this.formRepayment.dirty && !this.submmited;
  }
}
