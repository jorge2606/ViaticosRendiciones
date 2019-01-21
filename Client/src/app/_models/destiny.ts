import { ComplementariesCitiesDto } from "./city";
import { SupplementaryCityDto } from "./supplementaryCity";

export class DestinyDto{
    id : number;
    placeId : number;
    provinceId : number;
    provinceName : string;
    cityId : number; 
    cityName : string;
    supplementaryCity : SupplementaryCityDto[];
    countryId : number;
    countryName : string;
    codeLiquidationPercentage : number;
    startDate : any;
    days : number;
    categoryId : number;
    categoryName : string;
    codeLiquidationId : number;
    transportId : number;
    transportBrand : string;
    transportModel : string;
}