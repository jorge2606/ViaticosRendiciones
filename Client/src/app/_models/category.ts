export class Category{
    id : number;
    name : string;
    description : string;
    delete : Date;
}

export class CreateCategoryDto extends Category{}

export class UpdateCategoryDto extends Category{}

export class FindByIdCategoryDto extends Category{}

export class AllCategoryDto extends Category{}