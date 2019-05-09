import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from 'src/app/_services/reports.service';
import { GuidClass } from 'src/app/_helpers/guid-class';

@Component({
  selector: 'app-report-solicitation-subsidy',
  templateUrl: './report-solicitation-subsidy.component.html',
  styleUrls: ['./report-solicitation-subsidy.component.css']
})
export class ReportSolicitationSubsidyComponent implements OnInit {

  file: any;
  constructor(
        private spinner: NgxSpinnerService,
        private route : ActivatedRoute,
        private domSanitazer : DomSanitizer
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(
      url => {
        this.file= this.domSanitazer.bypassSecurityTrustResourceUrl(environment.apiUrl+"Report/Report_SolicitationByUser/"+url.userId);
      }
    );
    this.spinner.hide();
  }

}
