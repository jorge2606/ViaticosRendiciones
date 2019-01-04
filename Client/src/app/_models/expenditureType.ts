export class ExpenditureTypeBaseDto {
    id : number;
    name : string;
}

export class CreateExpenditureDto extends ExpenditureTypeBaseDto{}

export class UpdateExpenditureDto extends ExpenditureTypeBaseDto{}

export class DeleteExpenditureDto extends ExpenditureTypeBaseDto{}

export class FindByIdExpenditureDto extends ExpenditureTypeBaseDto{}

export class AllExpenditureDto extends ExpenditureTypeBaseDto{}