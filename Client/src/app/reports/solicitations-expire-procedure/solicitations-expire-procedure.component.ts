import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/_services/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitations-expire-procedure',
  templateUrl: './solicitations-expire-procedure.component.html',
  styleUrls: ['./solicitations-expire-procedure.component.css']
})
export class SolicitationsExpireComponent implements OnInit {
  file: any;

  constructor(
    private reportService : ReportsService,
    private spinner: NgxSpinnerService,
    private domSanitazer : DomSanitizer
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.file= this.domSanitazer.bypassSecurityTrustResourceUrl(environment.apiUrl+"Report/SolicitationsExpireProcedure");
    this.spinner.hide();
  }

}
