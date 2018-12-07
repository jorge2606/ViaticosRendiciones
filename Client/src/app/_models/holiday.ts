export class HolidayBaseDto{
    id : number;
    description : string;
    date : any;
}

export class CreateHolidayDto extends HolidayBaseDto{}

export class UpdateHolidayDto extends HolidayBaseDto{}

export class DeleteHolidayDto extends HolidayBaseDto{}

export class FindByIdHolidayDto extends HolidayBaseDto{}