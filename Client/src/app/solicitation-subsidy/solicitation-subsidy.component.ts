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
    userId : "",
    placeId: "",
    destinityId: "",
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

  constructor(private solicitationSubsidy : SolicitationSubsidyService) { }

  ngOnInit() {
    this.solicitationSubsidy.getAllSolicitationSubsidies(this.filters).subscribe(
      x => {
          this.solicitationSubsidies = x.list;
          this.col_size = x.totalRecords;
        }
    );
  }

}
