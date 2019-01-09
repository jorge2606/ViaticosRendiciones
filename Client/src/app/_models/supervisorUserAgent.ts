export class SupervisorUserAgentBaseDto{
    id : number;
    supervisorId : number;
    agentId : number;
}

export class AllSupervisorUserAgent{
    id : number;
    supervisors : SupervisorUserAgentBaseDto[];
    agents : SupervisorUserAgentBaseDto[];
}