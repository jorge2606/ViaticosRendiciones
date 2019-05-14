import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/_services/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitations-pending',
  templateUrl: './solicitations-pending.component.html',
  styleUrls: ['./solicitations-pending.component.css']
})
export class SolicitationsPendingComponent implements OnInit {
  file: any;

  constructor(
      private reportService : ReportsService,
      private spinner: NgxSpinnerService,
      private domSanitazer : DomSanitizer
  ) { }

  ngOnInit() {
    this.spinner.show();
        this.file= this.domSanitazer.bypassSecurityTrustResourceUrl(environment.apiUrl+"Report/SolicitationsPendingProcedure");
    this.spinner.hide();
  }

}
