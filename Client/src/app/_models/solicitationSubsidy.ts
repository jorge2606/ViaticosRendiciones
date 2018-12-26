import { AllPlaceDto } from './place';

export class Expenditure {
    id : number;
    description : string;
    cost : number;   
}

export class SolicitationSubsidyBaseDto{
    id : number;
    days : number;
    //beben ser eliminados
    costCommunication : number;
    costFuel : number;
    costMobility : number;
    //
    destinyId : number;
    motiveId : number;
    places : AllPlaceDto[];
    provinceId : number;
    cityId : number;
    categoryId : number;
    transportId : number;
    unexpextedCircumstance : number;
    startDate : Date;
    codeLiquidation : number;
    expenditures : Expenditure[];
}



export class CreateSolicitationSubsidyDto{
    id : number;
    days : number;
    motive : string;
    placeId : string;
    provinceId : number;
    cityId : number;
    categoryId : number;
    transportId : number;
    startDate : Date;
    codeLiquidation : number;
    expenditures : Expenditure[];
}
