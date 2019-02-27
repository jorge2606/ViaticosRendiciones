import { FileItem } from 'ng2-file-upload';
import { AllPlaceDto } from './place';
import { DestinyDto } from './destiny';
import { User } from '../users/users';

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

export class SolicitationIdDto extends DetailSolicitationSubsidyDto
{
    id : number;
    motiveReject : string;
    fileNumber : string;
}
