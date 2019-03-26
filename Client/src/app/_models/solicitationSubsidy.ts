import { DestinyDto } from './destiny';
import { User } from '../users/users';
import { DateDto } from './holiday';

export class ImageDto{
    lastModified: string;
    lastModifiedDate : any;
    name : string;
    size : number;
    type : string;
    webkitRelativePath : string;
}
export class Expenditure {
    id : number;
    description : string;
    amount : number;
    expenditureTypeId : number; 
    expenditureTypeName : string;   
    urlImage : string;
    accountedForAmount : number;
    imageDto : ImageDto;
}


export class SolicitationSubsidyBaseDto{
    id : number;
    motive : string;
    userId : number;
    destinies : DestinyDto[];
    expenditures : Expenditure[];
    total : number;
    createDate : any;
    isRefund : boolean;
}

export class SolicitationSubsidyDetail extends SolicitationSubsidyBaseDto{
    user : User;
    finalizeDate : DateDto;
}


export class CreateSolicitationSubsidyDto{
    id : number;
    motive : string;
    userId : number;
    destinies : DestinyDto[];
    expenditures : Expenditure[];
    total : number;
    createDate : any;
    isRefund : boolean;
    finalizeDate : DateDto;
}

export class AllSolicitationSubsidyDto extends SolicitationSubsidyBaseDto{
    user : any;
    state : string;
    motiveReject : string;
    fileNumber : string;
    fullName : string;
    localities : string;
    beginDate : Date;
    endDate : Date;
    daysWeekEnd : number = 0;
    daysHolidays : number = 0;
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

export class SolicitationIdDto extends DetailSolicitationSubsidyDto
{
    id : number;
    motiveReject : string;
    fileNumber : string;
    isRefund : boolean;
}