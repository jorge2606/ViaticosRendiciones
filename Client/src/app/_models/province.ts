export class ProvinceBaseDto {
    Id : number;
    name : string;
    createdDate : Date;
    isDeleted : boolean;
}

export class CreteProvinceDto extends ProvinceBaseDto {}

export class UpdateProvinceDto extends ProvinceBaseDto {}

export class DeleteProvinceDto extends ProvinceBaseDto {}

export class AllProvinceDto extends ProvinceBaseDto {}