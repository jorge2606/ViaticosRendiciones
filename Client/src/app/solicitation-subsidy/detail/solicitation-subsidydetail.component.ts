import { SolicitationSubsidyService } from './../../_services/solicitation-subsidy.service';
import { SolicitationSubsidyBaseDto } from './../../_models/solicitationSubsidy';
import { Component, OnInit } from '@angular/core';
import { ExpendituresUserService } from 'src/app/_services/expenditures-user.service';
import { ActivatedRoute } from '@angular/router';
import { ExpenditureUserBaseDto } from 'src/app/_models/expenditureUser';

@Component({
  selector: 'app-solicitation-subsidydetail',
  templateUrl: './solicitation-subsidydetail.component.html',
  styleUrls: ['./solicitation-subsidydetail.component.css']
})
export class SolicitationSubsidydetailComponent implements OnInit {

  id : number;
  model = new SolicitationSubsidyBaseDto;

  constructor(
    private route : ActivatedRoute,
    private solicitationSubsidyService : SolicitationSubsidyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      x => {
        this.id = x.id;
            if (this.id){
              this.solicitationSubsidyService.getByIdSolicitation(this.id)
              .subscribe(
                  solicitation => this.model = solicitation
              );
            }
        }
    );

  }

}
