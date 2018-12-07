export class SolicitatioSubsidyBaseDto{
    id : number;
    costCommunication : number;
    costFuel : number;
    costMobility : number;
    destinyId : number;
    motiveId : number;
    placeId : number;
    transportId : number;
    unexpextedCircumstance : number;
    startDate : any;
}

export class CreateSolicitationSubsidyDto extends SolicitatioSubsidyBaseDto{}