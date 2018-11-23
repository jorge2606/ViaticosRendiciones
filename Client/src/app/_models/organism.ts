export class OrganismBasaDto{
    id : number;
    name : string;
    description : string;
}

export class CreateOrganismDto extends OrganismBasaDto {}

export class UpdateOrganismDto extends OrganismBasaDto {}

export class FindByIdOrganismDto extends OrganismBasaDto {}