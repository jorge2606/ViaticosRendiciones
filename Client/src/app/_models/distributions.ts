export class DistributionBaseDto{
    id : number;
    name : string;
    description : string;
    organismId : number;
}

export class CreateDistributionDto extends DistributionBaseDto{}

export class UpdateDistributionDto extends DistributionBaseDto{}

export class DeleteDistributionDto extends DistributionBaseDto{}

export class FindByIdDistributionDto extends DistributionBaseDto{}