import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expenditure-procedure',
  templateUrl: './expenditure-procedure.component.html',
  styleUrls: ['./expenditure-procedure.component.css']
})
export class ExpenditureProcedureComponent implements OnInit {
  file: any;

  constructor(
    private spinner: NgxSpinnerService,
    private route : ActivatedRoute,
    private domSanitazer : DomSanitizer
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.file= this.domSanitazer.bypassSecurityTrustResourceUrl(environment.apiUrl+"Report/ExpenditureProcedure");
    this.spinner.hide();
  }

}
