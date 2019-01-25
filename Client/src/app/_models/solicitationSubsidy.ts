import { AllPlaceDto } from './place';
import { DestinyDto } from './destiny';
import { User } from '../users/users';

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

export class SolicitationSubsidyDetail extends SolicitationSubsidyBaseDto{
    user : User;
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
    state : string;
    motiveReject : string;
    fileNumber : string;
    fullName : string;
    localities : string;
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

export class SolicitationIdDto
{
    id : number;
    motiveReject : string;
    fileNumber : string;
}
