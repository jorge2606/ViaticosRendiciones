import { AllPlaceDto } from './place';
import { DestinyDto } from './destiny';

export class Expenditure {
    id : number;
    description : string;
    amount : number;
    expenditureTypeId : number; 
    expenditureTypeName : string;   
}

export class SolicitationSubsidyBaseDto{
    id : number;
    motive : string;
    userId : number;
    destinies : DestinyDto[];
    expenditures : Expenditure[];
    total : number;
    createDate : any;
}


export class CreateSolicitationSubsidyDto{
    id : number;
    motive : string;
    userId : number;
    destinies : DestinyDto[];
    expenditures : Expenditure[];
    total : number;
    createDate : any;
}

export class AllSolicitationSubsidyDto extends SolicitationSubsidyBaseDto{
    user : any;
}

export class DetailSolicitationSubsidyDto{
    id : number;
    motive : string;
    user : any;
    destinies : DestinyDto[];
    expenditures : Expenditure[];
    total : number;
    createDate : any;
}
