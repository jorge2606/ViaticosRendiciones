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

@Component({
  selector: 'app-add-destiny',
  templateUrl: './add-destiny.component.html',
  styleUrls: ['./add-destiny.component.css']
})
export class AddDestinyComponent implements OnInit {

  places : AllPlaceDto[] = [];
  provinceMock : AllProvinceDto[] =[];
  provinces  : AllProvinceDto[] = [];
  cities     : AllCitiesDto[] = [];
  citiesMock : AllCitiesDto[] = [];
  model = new DestinyDto;
  error : string;
  @Input() destiniesAdded : DestinyDto[];
  public isCollapsed = false;

  constructor(
    public activeModal: NgbActiveModal,
    private placeService : PlaceService,
    private provinceService : ProvinceService,
    private cityService : CityService,
    private destinyService : DestinyService
    ) { }

  ngOnInit() {
    this.AllPlace();
    this.AllProvince();
  }

  AllProvince(){
    this.provinceService.getAll().subscribe(
      x => this.provinceMock = x
    );
  }

  changeCity(e : any){
    console.log(e);
  }

  sendDataToComponent(model : DestinyDto[]){
    this.destinyService.sendMessage(model);
  }

  AllPlace(){
    this.placeService.getAll().subscribe(
      x => this.places = x 
    );
  }

  onChange(e : any){
    console.log(e);
  }
  
  onSubmit(){
    let exist = this.destiniesAdded.find( 
      x=> x.cityId == this.model.cityId && x.provinceId == this.model.provinceId
      );
    
    if (exist){
      this.error = "Provincia y Localidad existentes";
      return
    }
    
    this.error = "";
    let newDestiny = new DestinyDto;
    newDestiny.placeId = this.model.placeId;
    newDestiny.cityId = this.model.cityId;
    newDestiny.description = this.model.description;
    newDestiny.provinceId = this.model.provinceId;
    
    this.destiniesAdded.push(newDestiny);
    this.sendDataToComponent(this.destiniesAdded);
  }
  
  toogle(place : AllPlaceDto){
    place.checked = true;
    this.places.forEach(x =>
          {
            if (x.id != place.id){
              x.checked = !place.checked;
            }
          } 
      );
    
      this.provinces = this.provinceMock;
      this.provinces = this.provinces.filter(x => x.placeId == place.id);
      this.cities = [];
      this.model.provinceId = 0;
  }

  changeCityId(cityId : number){
    console.log(cityId);
    this.model.cityId = cityId;
  }

  citiesThisProvince(provinceId : any, place : AllPlaceDto){
    if(this.provinces.length == 0){//el usuario opta por escribir su destino sin usar los selects
      this.model.cityId = null;
      this.model.provinceId = null;
    }else if(this.provinces.length == 1){// la persona va a viajar dentro de corrientes
          console.log("citiesMock : "+this.citiesMock.length);
          if (this.citiesMock.length == 0){
            this.citiesProvinceCorrientes(provinceId); 
          }
          this.cities = this.citiesMock; 
          //la propiedad citiesMock contiene todas las localidades de Corrientes Solamente.
    }else if (this.provinces.length > 1){//la persona va a viajar fuera de corrientes
      this.citiesProvinceOtherProvince(provinceId);
      this.model.description = null;
    }
  }

  citiesProvinceCorrientes(provinceId : number){
    this.cityService.GetByIdCity(provinceId).subscribe(
      x=>{
          this.citiesMock = x;
          this.cities = x;
         } 
    );
  }

  citiesProvinceOtherProvince(provinceId : number){
    this.cityService.GetByIdCity(provinceId).subscribe(
      x=>this.cities = x
    );
  }

}
