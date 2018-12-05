import { TransportService } from 'src/app/_services/transport.service';
import { SolicitationSubsidyService } from './../_services/solicitation-subsidy.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitation-subsidy',
  templateUrl: './solicitation-subsidy.component.html',
  styleUrls: ['./solicitation-subsidy.component.css']
})
export class SolicitationSubsidyComponent implements OnInit {

  filters = {
    page : 0,
    userName : "",
    placeId: "",
    destinyId: "",
    transportId: "",
    motiveId: ""
  }

   //paginator
   col_size : number;
   page = 0;
   itemsPerPage : number = 10;
   //
   solicitationSubsidies : any[];
   error = '';
   transports : any;

  constructor(
    private solicitationSubsidy : SolicitationSubsidyService,
    private transportService : TransportService) { }

  ngOnInit() {
    this.getAll(this.filters);
    this.getAllTransport();
    
  }

  getAll(filters : any){
    this.solicitationSubsidy.getAllSolicitationSubsidies(filters).subscribe(
      x => {
          this.solicitationSubsidies = x.list;
          this.col_size = x.totalRecords;
        }
    );
  }

  getAllTransport(){
    this.transportService.getAll().subscribe(
      x => this.transports = x.response
    );
  }
  
  filter(){
    this.getAll(this.filters);
  }


}
