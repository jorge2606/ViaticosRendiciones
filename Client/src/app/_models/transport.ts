export class TransportBaseDto{
    id : number;
    type : string;
    model : string;
    brand : string;
    carPlate : string;
}

export class CreateTransportDto extends TransportBaseDto{}

export class UpdateTransportDto extends TransportBaseDto{}

export class DeleteTransportDto extends TransportBaseDto{}

export class FindByIdTransportDto extends TransportBaseDto{}

export class AllTransportDto extends TransportBaseDto{}