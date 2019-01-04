import { CodeLiquidationService } from './../../_services/code-liquidation.service';
import { AllCountryDto } from './../../_models/country';
import { DestinyService } from 'src/app/_services/destiny.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AllPlaceDto } from 'src/app/_models/place';
import { PlaceService } from 'src/app/_services/place.service';
import { AllProvinceDto } from 'src/app/_models/province';
import { AllCitiesDto } from 'src/app/_models/city';
import { CityService } from 'src/app/_services/city.service';
import { ProvinceService } from 'src/app/_services/province.service';
import { DestinyDto } from 'src/app/_models/destiny';
import { CategoryService } from 'src/app/_services/category.service';
import { AllCategoryDto } from 'src/app/_models/category';
import { TransportService } from 'src/app/_services/transport.service';
import { AllTransportDto } from 'src/app/_models/transport';
import { CountryService } from 'src/app/_services/country.service';
import { codeLiquidationBaseDto } from 'src/app/_models/codeLiquidation';

@Component({
  selector: 'app-add-destiny',
  templateUrl: './add-destiny.component.html',
  styleUrls: ['./add-destiny.component.css']
})
export class AddDestinyComponent implements OnInit {

  places : AllPlaceDto[] = [];
  transports : AllTransportDto[] = [];
  provinceMock : AllProvinceDto[] =[];
  provinces  : AllProvinceDto[] = [];
  countries : AllCountryDto[] = [];
  countriesMock : AllCountryDto[] = [];
  cities     : AllCitiesDto[] = [];
  citiesMock : AllCitiesDto[] = [];
  model = new DestinyDto;
  codeLiquidations : codeLiquidationBaseDto[] = [];
  codeLiquidationsMock : codeLiquidationBaseDto[] = [];
  error : string;
  @Input() destiniesAdded : DestinyDto[];
  isCollapsed = false;
  categories : AllCategoryDto[];

  constructor(
    public activeModal: NgbActiveModal,
    private placeService : PlaceService,
    private provinceService : ProvinceService,
    private cityService : CityService,
    private destinyService : DestinyService,
    private categoryService : CategoryService,
    private transportService : TransportService,
    private countryservice : CountryService,
    private codeLiquidationService : CodeLiquidationService
    ) { }

  ngOnInit() {
    this.AllPlace();
    this.AllProvince();
    this.allCategories();
    this.allTransports();
    this.allCountries();
    this.allCodeLiquidation();
  }

  allTransports(){
    this.transportService.getAll().subscribe(
      x => this.transports = x
    );
  }

  allCodeLiquidation(){
    this.codeLiquidationService.getAll().subscribe(
      x => {
            this.codeLiquidationsMock = x;
            this.codeLiquidations = x;
           }
    );
  }

  allCountries(){
    this.countryservice.getAllCountries().subscribe(
      x => {
            this.countriesMock = x;
            this.countries = x;
            }
    );
  }

  allCategories(){
    this.categoryService.getallCategories().subscribe(
      x => this.categories = x
      );
  }

  AllProvince(){
    this.provinceService.getAll().subscribe(
      x => {
            this.provinceMock = x;
            this.provinces = x;
          }
    );
  }

  changeCity(e : any){
    console.log(e);
  }

  sendDataToComponent(model : DestinyDto[]){
    this.destinyService.sendMessage(model);
    this.activeModal.close(null);
    
  }

  AllPlace(){
    this.placeService.getAll().subscribe(
      x => this.places = x.sort((a,b) => a.order - b.order)
          
    );
  }

  onChange(e : any){
    console.log(e);
  }
  
  onSubmit(){
    if (!this.model.countryId){
      let exist = this.destiniesAdded.find( 
        x=> x.cityId == this.model.cityId && x.provinceId == this.model.provinceId
        );
      
        if (exist){
          this.error = "Provincia y Localidad existentes";
          return
        }
    }

    this.error = "";
    let newDestiny = new DestinyDto;
    newDestiny.placeId = this.model.placeId;
    newDestiny.cityId = this.model.cityId;
    newDestiny.countryId = this.model.countryId;
    newDestiny.provinceId = this.model.provinceId;
    newDestiny.days = this.model.days;
    newDestiny.categoryId = this.model.categoryId;
    newDestiny.codeLiquidationId = this.model.codeLiquidationId;
    newDestiny.startDate = this.model.startDate;
    newDestiny.transportId = this.model.transportId;
    
    this.destiniesAdded.push(newDestiny);
    this.sendDataToComponent(this.destiniesAdded);
    
  }
  
  toogle(place : AllPlaceDto){
    this.model = new DestinyDto();
    this.model.placeId = place.id;

    place.checked = true;
    this.places.forEach(x =>
          {
            if (x.id != place.id){
              x.checked = !place.checked;
            }
          } 
      );
      
      this.countries = this.countriesMock;
      if ( this.countries[0].placeId != place.id ){
          this.provinces = this.provinceMock.filter(x => x.placeId == place.id);
          let firstProvince = this.provinces.sort()[0];
          this.model.provinceId = firstProvince.id;
          this.citiesProvince(firstProvince.id);
          this.countries = [];
      }else{
        this.model.countryId = this.countries[0].id;
      }
      
      this.codeLiquidations = this.codeLiquidationsMock.filter(x=> x.placeId == place.id).sort(x=> x.percentage);
      this.cities = [];
  }

  changeCityId(cityId : number){
    this.model.cityId = cityId;
  }

  citiesThisProvince(provinceId : any, place : AllPlaceDto){
    console.log(this.provinces.length+" "+this.countries.length);
    if(this.provinces.length == 0 && this.countries.length > 0){
      //si hay paises y provincias => va a viajar fuera del pais
      this.model.cityId = null;
      this.model.provinceId = null;
    }
    else if(this.provinces.length == 1 && this.countries.length == 0){
        //si hay paises y provincias => va a viajar dentro del pais
        //la persona va a viajar dentro de corrientes
          if (this.citiesMock.length == 0){
              this.citiesProvince(provinceId); 
          }
          this.cities = this.citiesMock; 
          this.model.cityId = this.cities[0].id;
          this.model.provinceId = provinceId;
          //la propiedad citiesMock contiene todas las localidades de Corrientes Solamente.
    }
    else if (this.provinces.length > 1 && this.countries.length == 0 ){
      //la persona va a viajar fuera de corrientes pero dentro del pais
      this.citiesProvince(provinceId);
      this.model.provinceId = provinceId;
      this.model.countryId = null;
    }
  }

  provinceThisCountry(countryId : any){
    this.provinces = this.provinceMock;
    let country = this.countries.find(x => x.id == countryId);
    this.provinces = this.provinces.filter(x=> x.districtCity == country.iso3);
  }

  citiesProvince(provinceId : number){
    this.cityService.GetByIdCity(provinceId).subscribe(
      x => {
        this.cities = x;
        this.model.cityId = this.cities[0].id;
      }
    );
  }

}
