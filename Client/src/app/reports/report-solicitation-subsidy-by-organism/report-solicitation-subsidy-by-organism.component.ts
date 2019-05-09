import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-solicitation-subsidy-by-organism',
  templateUrl: './report-solicitation-subsidy-by-organism.component.html',
  styleUrls: ['./report-solicitation-subsidy-by-organism.component.css']
})
export class ReportSolicitationSubsidyByOrganismComponent implements OnInit {

  file : any;
  constructor(
    private spinner: NgxSpinnerService,
    private route : ActivatedRoute,
    private domSanitazer : DomSanitizer
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(
      url => {
        this.file= this.domSanitazer.bypassSecurityTrustResourceUrl(environment.apiUrl+"Report/Report_SolicitationByOrganism/"+url.id);
      }
    );
    this.spinner.hide();
  }

}
