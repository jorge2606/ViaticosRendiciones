import { Component, OnInit } from '@angular/core';
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
  public isCollapsed = false;

  constructor(
    public activeModal: NgbActiveModal,
    private placeService : PlaceService,
    private provinceService : ProvinceService,
    private cityService : CityService,
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
  AllPlace(){
    this.placeService.getAll().subscribe(
      x => this.places = x 
    );
  }

  onChange(e : any){
    console.log(e);
  }
  onSubmit(){
    console.log(this.model);
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
  }

  changeCityId(cityId : number){
    console.log(cityId);
    this.model.cityId = cityId;
  }

  citiesThisProvince(provinceId : any, place : AllPlaceDto){
    this.provinces = this.provinceMock;
    this.provinces = this.provinces.filter(x => x.placeId == place.id);
    console.log(this.provinces);
    if(this.provinces.length == 0){
      this.model.cityId = null;
      this.model.provinceId = null;
    }else if(this.provinces.length == 1){
          console.log("citiesMock : "+this.citiesMock.length);
          if (this.citiesMock.length == 0){
            this.citiesProvince(this.provinces[0].id);
            this.citiesMock = this.cities;
          }else{
            this.cities = this.citiesMock;
          } 
    }else if (this.provinces.length > 1){
      this.model.destiny = null;
    }
  }

  citiesProvince(provinceId : number){
    this.cityService.GetByIdCity(provinceId).subscribe(
      x=>this.cities = x
    );
  }

}
