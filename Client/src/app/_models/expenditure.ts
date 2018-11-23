export class ExpenditureBaseDto {
    id : number;
    name : string;
    description : string;
}

export class CreateExpenditureDto extends ExpenditureBaseDto{}

export class UpdateExpenditureDto extends ExpenditureBaseDto{}

export class DeleteExpenditureDto extends ExpenditureBaseDto{}

export class FindByIdExpenditureDto extends ExpenditureBaseDto{}