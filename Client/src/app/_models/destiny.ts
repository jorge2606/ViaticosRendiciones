import { SupplementaryCityDto } from './supplementaryCity';

export class DestinyDto{
    id : number;
    placeId : number;
    provinceId : number;
    provinceName : string;
    cityId : number; 
    cityName : string;
    supplementaryCities : SupplementaryCityDto[];
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
    advanceCategory : number;
    percentageCodeLiquidation : number;
    solicitationTotalLetter : string;
    solicitationSubsidyId : number;
    textPercentage : string;
}

export class destinies_from_store_procedure{
    days : number;
    daysLetters : string;
    advanceCategory : number;
}