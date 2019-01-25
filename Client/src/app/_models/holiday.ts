export class HolidayBaseDto{
    id : number;
    description : string;
    date : DateDto;
}

export class DateDto{
    day : number;
    month : number;
    year : number;
}

export class CreateHolidayDto extends HolidayBaseDto{}

export class UpdateHolidayDto extends HolidayBaseDto{}

export class DeleteHolidayDto extends HolidayBaseDto{}

export class FindByIdHolidayDto extends HolidayBaseDto{}