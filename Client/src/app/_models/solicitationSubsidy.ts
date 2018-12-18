export class Expenditure {
    id : number;
    description : string;
    cost : number;   
}

export class SolicitationSubsidyBaseDto{
    id : number;
    days : number;
    costCommunication : number;
    costFuel : number;
    costMobility : number;
    destinyId : number;
    motiveId : number;
    placeId : number;
    provinceId : number;
    cityId : number;
    categoryId : number;
    transportId : number;
    unexpextedCircumstance : number;
    startDate : Date;
    codeLiquidation : number;
    expenditures : Expenditure[];
}



export class CreateSolicitationSubsidyDto extends SolicitationSubsidyBaseDto{}
